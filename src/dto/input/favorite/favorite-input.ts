import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FavoriteInput {
  @Field()
  spotId: string;

  @Field({ nullable: true })
  favoriteId?: string;
}
