import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/service/prisma.service';

@Injectable()
export class FavoriteRepository {
  constructor(private prisma: PrismaService) {}

  async getProfileFavorites(profileId: string) {
    return this.prisma.profile.findUnique({
      where: {
        id: profileId,
      },
      include: {
        favorites: {
          include: { spot: { include: { spotPicture: true } } },
        },
      },
    });
  }

  async getById(id: string) {
    return this.prisma.favorite.findUnique({
      where: {
        id,
      },
    });
  }

  create(spotId: string, profileId: string) {
    return this.prisma.favorite.create({
      data: {
        profile: { connect: { id: profileId } },
        spot: { connect: { id: spotId } },
      },
    });

    // return this.prisma.spot.update({
    //   where: {
    //     id: spotId,
    //   },
    //   data: {
    //     favorites: {
    //       create: {
    //         profileId,
    //       },
    //     },
    //   },
    //   include: { favorites: true },
    // });
  }

  delete(spotId: string, favoriteId: string) {
    return this.prisma.spot
      .update({
        where: {
          id: spotId,
        },
        data: {
          favorites: {
            delete: {
              id: favoriteId,
            },
          },
        },
        include: { favorites: true },
      })
      .then(() => true)
      .catch(() => false);
  }
}
