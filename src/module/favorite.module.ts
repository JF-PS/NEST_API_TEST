import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenService } from 'src/service/token.service';
import { PrismaService } from 'src/service/prisma.service';
import { AccessTokenGuard } from 'src/guard/accessToken.guard';
import { SpotRepository } from 'src/repository/spot.repository';
import { FavoriteResolver } from 'src/resolver/favorite.resolver';
import { FavoriteBusiness } from 'src/business/favorite.business';
import { FavoriteRepository } from 'src/repository/favorite.repository';
import { AccessTokenStrategy } from 'src/strategy/accessToken.strategy';
import { RefreshTokenStrategy } from 'src/strategy/refreshToken.strategy';

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
