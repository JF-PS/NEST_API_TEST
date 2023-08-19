import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ToggleFavoriteResponse {
  @Field()
  isFavorite: boolean;

  @Field({ nullable: true })
  favoriteId?: string;
}
