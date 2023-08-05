import { Field, InputType } from '@nestjs/graphql';
import { CategoriesSpotAndTag } from '@prisma/client';

@InputType()
export class SpotsInput {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  profileId: string;

  @Field({ nullable: true })
  orderBy: 'asc' | 'desc';

  @Field({ nullable: true })
  isCanPark: boolean;

  @Field({ nullable: true })
  isHidden: boolean;

  @Field({ nullable: true })
  category: CategoriesSpotAndTag;

  @Field({ nullable: true })
  searchValue: string;

  @Field(() => [String], { nullable: true })
  tagListId: string[];

  @Field({ nullable: true })
  region: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  skip: number;

  @Field({ nullable: true })
  take: number;
}
