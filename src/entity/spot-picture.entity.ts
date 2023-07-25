import { SpotPicture } from '@prisma/client';
import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { SpotEntity } from './spot.entity';

@ObjectType()
@Entity('SpotPicture')
export class SpotPictureEntity implements SpotPicture {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  url: string;

  @Field(() => SpotEntity)
  @ManyToOne(() => SpotEntity, (spot) => spot.spotPicture, {
    onDelete: 'CASCADE',
  })
  spot: SpotEntity;

  @Field()
  @Column({ unique: true })
  spotId: string;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
