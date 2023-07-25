import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsEnum, IsInt, IsString } from 'class-validator';
import { SpotEntity } from 'src/entity/spot.entity';
import { OrderByEnum } from './order-by.enum';

@InputType()
export class SpotListInput extends SpotEntity {
  @Field()
  @IsInt()
  skip: number;

  @Field()
  @IsInt()
  take: number;

  @Field()
  @IsArray()
  @IsString({ each: true })
  tagListId: string[];

  @Field()
  @IsString()
  searchValue: string;

  @IsEnum(OrderByEnum)
  orderBy: OrderByEnum;
}
