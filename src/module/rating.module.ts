import { Module } from '@nestjs/common';

import { PrismaService } from 'src/service/prisma.service';
import { SpotRepository } from 'src/repository/spot.repository';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/service/token.service';
import { AccessTokenStrategy } from 'src/strategy/accessToken.strategy';
import { RefreshTokenStrategy } from 'src/strategy/refreshToken.strategy';
import { AccessTokenGuard } from 'src/guard/accessToken.guard';
import { RatingBusiness } from 'src/business/rating.business';
import { RatingResolver } from 'src/resolver/rating.resolver';
import { RatingRepository } from 'src/repository/rating.repository';

@Module({
  providers: [
    RatingResolver,
    RatingBusiness,
    SpotRepository,
    RatingRepository,
    JwtService,
    TokenService,
    PrismaService,
    AccessTokenGuard,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class RatingModule {}
