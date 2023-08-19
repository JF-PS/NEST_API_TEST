import { Module } from '@nestjs/common';

import { PrismaService } from 'src/service/prisma.service';
import { SpotRepository } from 'src/repository/spot.repository';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/service/token.service';
import { AccessTokenStrategy } from 'src/strategy/accessToken.strategy';
import { RefreshTokenStrategy } from 'src/strategy/refreshToken.strategy';
import { AccessTokenGuard } from 'src/guard/accessToken.guard';
import { FavoriteResolver } from 'src/resolver/favorite.resolver';
import { FavoriteBusiness } from 'src/business/favorite.business';
import { FavoriteRepository } from 'src/repository/favorite.repository';

@Module({
  providers: [
    FavoriteResolver,
    FavoriteBusiness,
    FavoriteRepository,
    SpotRepository,
    JwtService,
    TokenService,
    PrismaService,
    AccessTokenGuard,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class FavoriteModule {}
