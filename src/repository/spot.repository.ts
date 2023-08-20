import { Injectable } from '@nestjs/common';
import { SpotInput } from 'src/dto/input/spot/spot-input';
import { SpotsInput } from 'src/dto/input/spot/spots-input';
import { SpotEntity } from 'src/entity/spot.entity';
import { PrismaService } from 'src/service/prisma.service';
import { plainToClass, plainToClassMany } from 'src/utils/plain-to-class';

export type spotPaginationInput = {
  take: number;
  skip: number;
};

@Injectable()
export class SpotRepository {
  constructor(private prisma: PrismaService) {}

  async getById(
    id: string,
    profileId?: string | undefined,
  ): Promise<SpotEntity> {
    const spot = await this.prisma.spot.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
        spotPicture: true,
        tags: { include: { tag: true } },
        _count: {
          select: { ratings: true },
        },
        ratings: {
          where: {
            profileId,
          },
        },
        favorites: {
          where: {
            profileId,
          },
        },
      },
    });

    return plainToClass(spot, SpotEntity);
  }

  async getAll(
    spotsInput: Omit<SpotsInput, 'point'>,
    ids: string[] | undefined,
    profileId?: string | undefined,
  ): Promise<SpotEntity[]> {
    const {
      orderBy = 'asc',
      searchValue = '',
      tagListId = [],
      take = 10,
      skip = 0,
      ...filterData
    } = spotsInput;

    const spotList = await this.prisma.spot.findMany({
      orderBy: {
        averageRating: orderBy,
      },

      where: {
        ...filterData,
        id: {
          in: ids,
        },
        name: {
          contains: searchValue,
        },
        ...(tagListId && tagListId.length
          ? {
              tags: {
                some: {
                  OR: tagListId.map((tagId) => {
                    return {
                      tag: {
                        id: tagId,
                      },
                    };
                  }),
                },
              },
            }
          : {}),
      },

      take,
      skip,

      include: {
        spotPicture: true,
        tags: {
          include: {
            tag: true,
          },
        },
        favorites: {
          where: {
            profileId,
          },
        },
      },
    });

    return plainToClassMany(spotList, SpotEntity);
  }

  async create(
    insertSpotInput: SpotInput,
    profileId: string,
  ): Promise<SpotEntity> {
    const { spotPicture, tags, ...values } = insertSpotInput;
    const spot = await this.prisma.spot.create({
      data: {
        ...values,
        tags: {
          create: tags.map((tag) => {
            return {
              tag: {
                connect: { id: tag.id },
              },
            };
          }),
        },
        profile: {
          connect: { id: profileId },
        },
        spotPicture: {
          create: [...spotPicture],
        },
      },
      include: { spotPicture: true, tags: { include: { tag: true } } },
    });
    return plainToClass(spot, SpotEntity);
  }

  async update(updateSpotInput: SpotInput): Promise<SpotEntity> {
    const { id: spotId, spotPicture, tags, ...values } = updateSpotInput;

    const spot = await this.prisma.spot.update({
      where: {
        id: spotId,
      },

      data: {
        ...values,
        tags: {
          deleteMany: {},
          create: tags?.map((tag) => {
            return {
              tag: {
                connect: { id: tag.id },
              },
            };
          }),
        },

        spotPicture: {
          deleteMany: {},
          create: [...spotPicture],
        },
      },

      include: { spotPicture: true, tags: { include: { tag: true } } },
    });
    return plainToClass(spot, SpotEntity);
  }

  async delete(spotId: string, profileId: string): Promise<boolean> {
    return this.prisma.profile
      .update({
        where: {
          id: profileId,
        },
        data: {
          spots: {
            delete: {
              id: spotId,
            },
          },
        },
      })
      .then(() => true)
      .catch(() => false);
  }

  // async getTagBySpotId(id: string) {
  //   const spotFind = this.prisma.spot.findUnique({
  //     where: {
  //       id,
  //     },
  //     include: { spotPicture: true, ratings: true, favorites: true },
  //   });
  //   return spotFind.tags;
  // }

  async updateAverageRatingBySpotId(
    spotId: string,
    avg: number,
  ): Promise<boolean> {
    return this.prisma.spot
      .update({
        where: {
          id: spotId,
        },
        data: {
          averageRating: avg,
        },
      })
      .then(() => true)
      .catch(() => false);
  }
}
