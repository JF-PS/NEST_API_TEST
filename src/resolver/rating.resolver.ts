import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { Public } from '../decorator/public.decorator';
import { CurrentProfileId } from 'src/decorator/currentProfileId.decorator.';
import { UseGuards } from '@nestjs/common';
import { RefreshTokenGuard } from 'src/guard/refreshToken.guard';
import { RatingInput } from 'src/dto/input/rating/rating-input';
import { RatingBusiness } from 'src/business/rating.business';
import { RatingResponse } from 'src/dto/response/rating-response';
import { RatingEntity } from 'src/entity/rating.entity';

@Resolver(() => RatingEntity)
export class RatingResolver {
  constructor(private readonly ratingBusiness: RatingBusiness) {}

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation(() => RatingResponse)
  createOrUpdateRating(
    @Args('ratingInput') ratingInput: RatingInput,
    @CurrentProfileId() profileId: string,
  ): Promise<RatingResponse> {
    return this.ratingBusiness.createOrUpdate(ratingInput, profileId);
  }
}
