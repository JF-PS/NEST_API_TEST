import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TagUpdateInput {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  tagPictureUrl: string;
}
