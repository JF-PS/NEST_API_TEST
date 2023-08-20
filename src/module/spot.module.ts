import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { SpotSchema } from 'src/schema/spot.shema';
import { TokenService } from 'src/service/token.service';
import { SpotResolver } from 'src/resolver/spot.resolver';
import { SpotBusiness } from 'src/business/spot.business';
import { PrismaService } from 'src/service/prisma.service';
import { AccessTokenGuard } from 'src/guard/accessToken.guard';
import { SpotRepository } from 'src/repository/spot.repository';
import { AccessTokenStrategy } from 'src/strategy/accessToken.strategy';
import { RefreshTokenStrategy } from 'src/strategy/refreshToken.strategy';
import { SpotGeospatialService } from 'src/service/spot-geospatial.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Spot', schema: SpotSchema }])],
  providers: [
    SpotResolver,
    SpotBusiness,
    SpotRepository,
    JwtService,
    TokenService,
    PrismaService,
    SpotGeospatialService,
    AccessTokenGuard,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class SpotModule {}
