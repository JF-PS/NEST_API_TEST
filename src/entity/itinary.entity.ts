import { Itinary } from '@prisma/client';
import { ObjectType, Field } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { ProfileEntity } from './profile.entity';
import { SpotEntity } from './spot.entity';

@ObjectType()
@Entity('Itinary')
export class ItinaryEntity implements Itinary {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  gamePoint: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  photoUrl: string;

  @Field(() => [ProfileEntity], { nullable: true })
  @ManyToMany(() => ProfileEntity, (profile) => profile.itineraries)
  @JoinTable()
  profiles: ProfileEntity[];

  @Field(() => [SpotEntity], { nullable: true })
  @ManyToMany(() => SpotEntity, (spot) => spot.itinaries)
  @JoinTable()
  spots: SpotEntity[];

  @Field(() => [String])
  @Column()
  profileIDs: string[];

  @Field(() => [String])
  @Column()
  spotIDs: string[];

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
