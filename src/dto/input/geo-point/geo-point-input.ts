import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class GeoPointInput {
  @Field(() => [Float], { nullable: true })
  coordinates: [number, number];

  @Field({ nullable: true })
  maxDistance: number;
}
