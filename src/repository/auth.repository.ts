/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';
import { GetResult } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

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
}
