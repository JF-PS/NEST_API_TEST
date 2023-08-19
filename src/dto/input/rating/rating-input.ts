import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RatingInput {
  @Field()
  rate: number;

  @Field({ nullable: true })
  ratingId?: string | undefined;

  @Field()
  spotId: string;
}
