import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/service/prisma.service';
import { TokenService } from 'src/service/token.service';
import { AuthResolver } from 'src/resolver/auth.resolver';
import { AuthBusiness } from 'src/business/auth.business';
import { AuthRepository } from 'src/repository/auth.repository';

import { AccessTokenStrategy } from '../strategy/accessToken.strategy';
import { RefreshTokenStrategy } from '../strategy/refreshToken.strategy';
import { AccessTokenGuard } from 'src/guard/accessToken.guard';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshTokenGuard } from 'src/guard/refreshToken.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt-refresh' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('REFRESH_TOKEN_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthResolver,
    AuthBusiness,
    AuthRepository,
    JwtService,
    TokenService,
    PrismaService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AccessTokenGuard,
    RefreshTokenGuard,
  ],
  exports: [
    AccessTokenGuard,
    RefreshTokenGuard,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
