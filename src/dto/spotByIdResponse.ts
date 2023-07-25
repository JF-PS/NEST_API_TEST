import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, ValidateNested } from 'class-validator';
import { SpotEntity } from 'src/entity/spot.entity';

class CountRatingDto {
  @IsNumber()
  ratings: number;
}

@InputType()
export class SpotByIdResponse extends SpotEntity {
  @Field()
  @ValidateNested()
  _count: CountRatingDto;
}
