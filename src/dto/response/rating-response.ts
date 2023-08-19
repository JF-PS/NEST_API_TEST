import { Field, ObjectType } from '@nestjs/graphql';
import { RatingEntity } from 'src/entity/rating.entity';

@ObjectType()
export class RatingResponse {
  @Field()
  currentRating: RatingEntity;

  @Field()
  avg: number;

  @Field()
  maxVote: number;
}
