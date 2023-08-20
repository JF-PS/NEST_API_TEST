import { Field, InputType } from '@nestjs/graphql';
import { CategoriesSpotAndTag } from '@prisma/client';

import { Column } from 'typeorm';
import { SpotPictureInput } from '../spot-picture/spot-picture-input';
import { TagInput } from '../tag/tag.input';
import GraphQLJSON from 'graphql-type-json';
import { Location } from 'src/entity/spot.entity';

@InputType()
export class SpotInput {
  @Field({ nullable: true })
  @Column()
  id?: string;

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

  @Field(() => [SpotPictureInput], { nullable: true })
  spotPicture?: SpotPictureInput[] | null;

  @Field(() => [TagInput], { nullable: true })
  tags?: TagInput[] | null;
}
