import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { PrismaService } from './service/prisma.service';
import { AuthModule } from 'src/module/auth.module';
import { UserModule } from 'src/module/user.module';
import { SpotModule } from 'src/module/spot.module';
import { ConfigModule } from '@nestjs/config';
import { RatingModule } from './module/rating.module';
import { FavoriteModule } from './module/favorite.module';
import { TagModule } from './module/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    SpotModule,
    UserModule,
    TagModule,
    RatingModule,
    FavoriteModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
