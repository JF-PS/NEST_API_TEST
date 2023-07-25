import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteSpotResponse {
  @Field()
  deleted: boolean;
}
