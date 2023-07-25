import { Injectable } from '@nestjs/common';

import { UserEntity } from 'src/entity/user.entity';
import { PrismaService } from 'src/service/prisma.service';
import { plainToClass } from 'src/utils/plain-to-class';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async getOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });
    return plainToClass(user, UserEntity);
  }

  async getOneById(userId: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
    return plainToClass(user, UserEntity);
  }

  async create(
    pseudo: string,
    hashedPassword: string,
    email: string,
  ): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: {
        hashedPassword,
        email,
        profile: { create: { pseudo } },
      },
      include: { profile: true },
    });

    return plainToClass(user, UserEntity);
  }

  async updateRefreshToken(
    userId: string,
    hashedRefreshToken: string,
  ): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken },
      include: { profile: true },
    });

    return plainToClass(user, UserEntity);
  }

  async disconnect(userId: string): Promise<boolean> {
    return this.prisma.user
      .updateMany({
        where: { id: userId, hashedRefreshToken: { not: null } },
        data: { hashedRefreshToken: null },
      })
      .then(() => true)
      .catch(() => false);
  }
}
