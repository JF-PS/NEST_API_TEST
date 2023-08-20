import { Spot, CategoriesSpotAndTag } from '@prisma/client';
import { ObjectType, Field, Float } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import { TagEntity } from './tag.entity';
import { RatingEntity } from './rating.entity';
import { ProfileEntity } from './profile.entity';
import { FavoriteEntity } from './favorite.entity';
import { SpotPictureEntity } from './spot-picture.entity';

@ObjectType()
export class Location {
  @Field()
  type: 'Point';

  @Field(() => [Float])
  coordinates: [number, number];
}

@ObjectType()
@Entity('Spot')
export class SpotEntity implements Spot {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column({ default: false })
  isCanPark: boolean;

  @Field()
  @Column({ default: false })
  isHidden: boolean;

  @Field()
  @Column({ type: 'enum', enum: CategoriesSpotAndTag })
  category: CategoriesSpotAndTag;

  @Field(() => ProfileEntity)
  @ManyToOne(() => ProfileEntity, (profile) => profile.spots)
  profile: ProfileEntity;

  @Field()
  @Column()
  profileId: string;

  @Field()
  @Column('float')
  lat: number;

  @Field()
  @Column('float')
  lng: number;

  @Field(() => GraphQLJSON, { nullable: true })
  @Column('json')
  location: Location;

  @Field()
  @Column()
  region: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column({ default: 0 })
  averageRating: number;

  @Field(() => [SpotPictureEntity], { nullable: true })
  @OneToMany(() => SpotPictureEntity, (spotPicture) => spotPicture.spot, {
    cascade: true,
  })
  spotPicture?: SpotPictureEntity[] | null;

  @Field(() => [RatingEntity], { nullable: true })
  @OneToMany(() => RatingEntity, (rating) => rating.spot, { cascade: true })
  ratings?: RatingEntity[] | null;

  @Field(() => [FavoriteEntity], { nullable: true })
  @OneToMany(() => FavoriteEntity, (favorite) => favorite.spot, {
    cascade: true,
  })
  favorites?: FavoriteEntity[] | null;

  @Field(() => [TagEntity], { nullable: true })
  @ManyToMany(() => TagEntity, (tag) => tag.spots)
  tags?: TagEntity[] | null;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
