import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenService } from 'src/service/token.service';
import { PrismaService } from 'src/service/prisma.service';
import { RatingBusiness } from 'src/business/rating.business';
import { RatingResolver } from 'src/resolver/rating.resolver';
import { AccessTokenGuard } from 'src/guard/accessToken.guard';
import { SpotRepository } from 'src/repository/spot.repository';
import { RatingRepository } from 'src/repository/rating.repository';
import { AccessTokenStrategy } from 'src/strategy/accessToken.strategy';
import { RefreshTokenStrategy } from 'src/strategy/refreshToken.strategy';

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
