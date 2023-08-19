import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { Public } from '../decorator/public.decorator';
import { FavoriteEntity } from 'src/entity/favorite.entity';
import { RefreshTokenGuard } from 'src/guard/refreshToken.guard';
import { FavoriteBusiness } from 'src/business/favorite.business';
import { FavoriteInput } from 'src/dto/input/favorite/favorite-input';
import { CurrentProfileId } from 'src/decorator/currentProfileId.decorator.';
import { ToggleFavoriteResponse } from 'src/dto/response/toggle-favorite-response';

@Resolver(() => FavoriteEntity)
export class FavoriteResolver {
  constructor(private readonly favoriteBusiness: FavoriteBusiness) {}

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Query(() => [FavoriteEntity])
  spotsProfile(
    @CurrentProfileId() profileId: string,
  ): Promise<FavoriteEntity[]> {
    return this.favoriteBusiness.getAllByProfileId(profileId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation(() => ToggleFavoriteResponse)
  toggleFavorite(
    @Args('favoriteInput') favoriteInput: FavoriteInput,
    @CurrentProfileId() profileId: string,
  ): Promise<ToggleFavoriteResponse> {
    return this.favoriteBusiness.createOrDelete(favoriteInput, profileId);
  }
}
