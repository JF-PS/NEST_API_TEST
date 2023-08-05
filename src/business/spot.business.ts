import { Injectable } from '@nestjs/common';

import { SpotEntity } from 'src/entity/spot.entity';
import ErrorService from 'src/service/error.service';
import { codeErrors } from 'src/enum/code-errors.enum';
import { SpotInput } from 'src/dto/input/spot/spot-input';
import { SpotRepository } from 'src/repository/spot.repository';
import { DeleteSpotResponse } from 'src/dto/delete-spot-response';
import { SpotsInput } from 'src/dto/input/spot/spots-input';

const { SPOT_NOT_FOUND, SPOT_ID_NOT_MATCH_PROFILE_ID } = codeErrors;

@Injectable()
export class SpotBusiness {
  constructor(private spotRepository: SpotRepository) {}

  async getById(
    id: string,
    profileId: string | undefined,
  ): Promise<SpotEntity> {
    return this.spotRepository.getById(id, profileId);
  }

  async getAll(
    spotsInput: SpotsInput,
    profileId: string | undefined,
  ): Promise<SpotEntity[]> {
    return this.spotRepository.getAll(spotsInput, profileId);
  }

  async insert(
    insertSpotInput: SpotInput,
    profileId: string,
  ): Promise<SpotEntity> {
    return await this.spotRepository.create(insertSpotInput, profileId);
  }

  async update(
    updateSpotInput: SpotInput,
    profileId: string,
  ): Promise<SpotEntity> {
    this.checkUserIsOwner(updateSpotInput.id, profileId);
    return await this.spotRepository.update(updateSpotInput);
  }

  async checkUserIsOwner(
    spotId: string,
    currentProfileId: string,
  ): Promise<void> {
    const spot = await this.spotRepository.getById(spotId);
    if (!spot) throw new ErrorService(SPOT_NOT_FOUND, spotId);
    if (currentProfileId !== spot.profileId)
      throw new ErrorService(SPOT_ID_NOT_MATCH_PROFILE_ID);
  }

  async delete(id: string, profileId: string): Promise<DeleteSpotResponse> {
    const deleted = await this.spotRepository.delete(id, profileId);
    return { deleted };
  }
}
