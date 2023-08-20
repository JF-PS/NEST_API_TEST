import { Injectable } from '@nestjs/common';

import ErrorService from 'src/service/error.service';
import { codeErrors } from 'src/enum/code-errors.enum';
import { SpotRepository } from 'src/repository/spot.repository';
import { FavoriteInput } from 'src/dto/input/favorite/favorite-input';
import { FavoriteRepository } from 'src/repository/favorite.repository';
import { ToggleFavoriteResponse } from 'src/dto/response/toggle-favorite-response';
import { FavoriteEntity } from 'src/entity/favorite.entity';
import { TagRepository } from 'src/repository/tag.repository';
import { TagListInput } from 'src/dto/input/tag/tag-list-input';
import { TagEntity } from 'src/entity/tag.entity';
import { TagInsertInput } from 'src/dto/input/tag/tag-insert.input';
import { TagUpdateInput } from 'src/dto/input/tag/tag-update.input';
import { DeleteResponse } from 'src/dto/response/delete.response';

const {
  ACCESS_DENIED,
  SPOT_ID_MATCH_PROFILE_ID,
  SPOT_NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = codeErrors;

@Injectable()
export class TagBusiness {
  constructor(private tagRepository: TagRepository) {}

  async getAll(tagListInput: TagListInput): Promise<TagEntity[]> {
    return this.tagRepository.getAll(tagListInput);
  }

  async getById(id: string): Promise<TagEntity> {
    return this.tagRepository.getById(id);
  }

  async insert(tagInsertInput: TagInsertInput): Promise<TagEntity> {
    return this.tagRepository.create(tagInsertInput);
  }

  async update(tagUpdateInput: TagUpdateInput): Promise<TagEntity> {
    return this.tagRepository.update(tagUpdateInput);
  }

  async delete(id: string): Promise<DeleteResponse> {
    const deleted = await this.tagRepository.delete(id);
    return { deleted };
  }
}
