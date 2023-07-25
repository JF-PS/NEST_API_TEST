import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { UserEntity } from 'src/entity/user.entity';

@ObjectType()
export class SignResponse {
  @IsNotEmpty()
  @IsString()
  @Field()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  refreshToken: string;

  @Field(() => UserEntity)
  user: UserEntity;
}
