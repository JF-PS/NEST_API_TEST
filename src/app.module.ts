import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { PrismaService } from './service/prisma.service';
import { AuthModule } from 'src/module/auth.module';
import { UserModule } from 'src/module/user.module';
import { SpotModule } from 'src/module/spot.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RefreshTokenGuard } from './guard/refreshToken.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    AuthModule,
    SpotModule,
    UserModule,
  ],
  controllers: [],

  providers: [
    PrismaService,
    { provide: APP_GUARD, useClass: RefreshTokenGuard },
  ],
})
export class AppModule {}
