import { Field, InputType } from '@nestjs/graphql';
import { CategoriesSpotAndTag } from 'src/entity/categories-spot-and-tag.enum';

@InputType()
export class TagInsertInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  tagPictureUrl: string;

  @Field({ nullable: true })
  category: CategoriesSpotAndTag;
}
