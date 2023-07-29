import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';

import { Public } from '../decorator/public.decorator';
import { SpotEntity } from 'src/entity/spot.entity';
import { SpotBusiness } from './../business/spot.business';
import { SpotInput } from 'src/dto/input/spot/spot-input';
import { CurrentProfileId } from 'src/decorator/currentProfileId.decorator.';
import { UseGuards } from '@nestjs/common';
import { RefreshTokenGuard } from 'src/guard/refreshToken.guard';
import { DeleteSpotResponse } from 'src/dto/delete-spot-response';
import { CurrentUser } from 'src/decorator/currentUser.decorator';

@Resolver(() => SpotEntity)
export class SpotResolver {
  constructor(private readonly spotBusiness: SpotBusiness) {}

  @Public()
  @Query(() => SpotEntity)
  @UseGuards(RefreshTokenGuard)
  spotByPk(
    @Args('id', { type: () => String }) id: string,
    @CurrentProfileId() profileId: string | undefined,
  ): Promise<SpotEntity> {
    return this.spotBusiness.getById(id, profileId);
  }

  // @Query(() => [SpotEntity])
  // spots(
  //   @Args('spotListInput') spotListInput: SpotListInput,
  // ): Promise<[SpotEntity]> {
  //   return this.spotBusiness.getAll(spotListInput);
  // }

  @UseGuards(RefreshTokenGuard)
  @Mutation(() => SpotEntity)
  insertSpot(
    @Args('insertSpotInput') insertSpotInput: SpotInput,
    @CurrentProfileId() profileId: string,
  ): Promise<SpotEntity> {
    return this.spotBusiness.insert(insertSpotInput, profileId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation(() => SpotEntity)
  updateSpot(
    @Args('updateSpotInput') updateSpotInput: SpotInput,
    @CurrentProfileId() profileId: string,
  ): Promise<SpotEntity> {
    return this.spotBusiness.update(updateSpotInput, profileId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation(() => DeleteSpotResponse)
  deleteSpot(
    @Args('id', { type: () => String }) id: string,
    @CurrentProfileId() profileId: string,
  ): Promise<DeleteSpotResponse> {
    return this.spotBusiness.delete(id, profileId);
  }
}
