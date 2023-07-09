import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';
import { GetResult } from '@prisma/client/runtime';
import { PrismaService } from 'src/service/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async getOneByEmail(email: string): Promise<GetResult<User, never>> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async getOneById(userId: string): Promise<GetResult<User, never>> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async create(
    username: string,
    hashedPassword: string,
    email: string,
  ): Promise<GetResult<User, never>> {
    return this.prisma.user.create({
      data: { username, hashedPassword, email },
    });
  }

  async updateRefreshToken(
    userId: string,
    hashedRefreshToken: string,
  ): Promise<GetResult<User, never>> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken },
    });
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
