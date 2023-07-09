import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/service/prisma.service';
import { TokenService } from 'src/service/token.service';
import { AuthResolver } from 'src/resolver/auth.resolver';
import { AuthBusiness } from 'src/business/auth.business';
import { AuthRepository } from 'src/repository/auth.repository';

import { AccessTokenStrategy } from '../strategy/accessToken.strategy';
import { RefreshTokenStrategy } from '../strategy/refreshToken.strategy';

@Module({
  providers: [
    AuthResolver,
    AuthBusiness,
    AuthRepository,
    JwtService,
    TokenService,
    PrismaService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
