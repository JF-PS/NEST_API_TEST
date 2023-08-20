import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TagInput {
  @Field()
  id: string;
}
