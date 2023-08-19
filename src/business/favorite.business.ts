import { Injectable } from '@nestjs/common';

import ErrorService from 'src/service/error.service';
import { codeErrors } from 'src/enum/code-errors.enum';
import { SpotRepository } from 'src/repository/spot.repository';
import { FavoriteInput } from 'src/dto/input/favorite/favorite-input';
import { FavoriteRepository } from 'src/repository/favorite.repository';
import { ToggleFavoriteResponse } from 'src/dto/response/toggle-favorite-response';
import { FavoriteEntity } from 'src/entity/favorite.entity';

const {
  ACCESS_DENIED,
  SPOT_ID_MATCH_PROFILE_ID,
  SPOT_NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = codeErrors;

@Injectable()
export class FavoriteBusiness {
  constructor(
    private favoriteRepository: FavoriteRepository,
    private spotRepository: SpotRepository,
  ) {}

  async getAllByProfileId(profileId: string): Promise<FavoriteEntity[]> {
    const { favorites } = await this.favoriteRepository.getProfileFavorites(
      profileId,
    );
    return favorites;
  }

  async createOrDelete(
    favoriteInput: FavoriteInput,
    profileId: string,
  ): Promise<ToggleFavoriteResponse> {
    const { spotId, favoriteId } = favoriteInput;

    const spot = await this.spotRepository.getById(spotId);

    if (!spot) throw new ErrorService(SPOT_NOT_FOUND, spotId);
    if (profileId === spot.profileId)
      throw new ErrorService(SPOT_ID_MATCH_PROFILE_ID);

    if (!favoriteId) {
      const favorite = await this.favoriteRepository.create(spotId, profileId);
      if (!favorite) throw new ErrorService(INTERNAL_SERVER_ERROR);

      return {
        isFavorite: true,
        favoriteId: favorite.id,
      };
    }

    const favorite = await this.favoriteRepository.getById(favoriteId);

    if (profileId === favorite?.profileId) {
      const validated = await this.favoriteRepository.delete(
        spotId,
        favoriteId,
      );

      return { isFavorite: !validated };
    }

    throw new ErrorService(ACCESS_DENIED);
  }
}
