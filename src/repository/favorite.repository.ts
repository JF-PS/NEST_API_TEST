import { Injectable } from '@nestjs/common';

import { plainToClass } from 'src/utils/plain-to-class';
import { ProfileEntity } from 'src/entity/profile.entity';
import { PrismaService } from 'src/service/prisma.service';

@Injectable()
export class FavoriteRepository {
  constructor(private prisma: PrismaService) {}

  async getProfileFavorites(profileId: string): Promise<ProfileEntity> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        id: profileId,
      },
      include: {
        favorites: {
          include: { spot: { include: { spotPicture: true } } },
        },
      },
    });

    return plainToClass(profile, ProfileEntity);
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
