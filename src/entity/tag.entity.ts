import { Tag, CategoriesSpotAndTag } from '@prisma/client';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { SpotEntity } from './spot.entity';
// import { CategoriesSpotAndTag } from './categories-spot-and-tag.enum';

@ObjectType()
@Entity('Tag')
export class TagEntity implements Tag {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column()
  tagPictureUrl: string;

  @Field()
  @Column()
  category: CategoriesSpotAndTag;

  @Field(() => [SpotEntity], { nullable: true })
  @ManyToMany(() => SpotEntity, (spot) => spot.tags)
  @JoinTable()
  spots: SpotEntity[];

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
