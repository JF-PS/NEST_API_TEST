import { Favorite } from '@prisma/client';
import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { ProfileEntity } from './profile.entity';
import { SpotEntity } from './spot.entity';

@ObjectType()
@Entity('Favorite')
export class FavoriteEntity implements Favorite {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => ProfileEntity)
  @ManyToOne(() => ProfileEntity, (profile) => profile.favorites, {
    onDelete: 'CASCADE',
  })
  profile: ProfileEntity;

  @Field()
  @Column()
  profileId: string;

  @Field(() => SpotEntity)
  @ManyToOne(() => SpotEntity, (spot) => spot.favorites, {
    onDelete: 'CASCADE',
  })
  spot: SpotEntity;

  @Field()
  @Column()
  spotId: string;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
