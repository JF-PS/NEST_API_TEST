import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TagResolver } from 'src/resolver/tag.resolver';
import { TagBusiness } from 'src/business/tag.business';
import { TokenService } from 'src/service/token.service';
import { PrismaService } from 'src/service/prisma.service';
import { TagRepository } from 'src/repository/tag.repository';
import { AccessTokenGuard } from 'src/guard/accessToken.guard';
import { AccessTokenStrategy } from 'src/strategy/accessToken.strategy';
import { RefreshTokenStrategy } from 'src/strategy/refreshToken.strategy';

@Module({
  providers: [
    TagResolver,
    TagBusiness,
    TagRepository,
    JwtService,
    TokenService,
    PrismaService,
    AccessTokenGuard,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class TagModule {}
