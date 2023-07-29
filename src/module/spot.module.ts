import { Module } from '@nestjs/common';

import { PrismaService } from 'src/service/prisma.service';
import { SpotResolver } from 'src/resolver/spot.resolver';
import { SpotBusiness } from 'src/business/spot.business';
import { SpotRepository } from 'src/repository/spot.repository';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/service/token.service';
import { AccessTokenStrategy } from 'src/strategy/accessToken.strategy';
import { RefreshTokenStrategy } from 'src/strategy/refreshToken.strategy';
import { AccessTokenGuard } from 'src/guard/accessToken.guard';

@Module({
  providers: [
    SpotResolver,
    SpotBusiness,
    SpotRepository,
    JwtService,
    TokenService,
    PrismaService,
    AccessTokenGuard,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class SpotModule {}
