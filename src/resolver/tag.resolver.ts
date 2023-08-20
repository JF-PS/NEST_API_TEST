import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Public } from '../decorator/public.decorator';
import { CurrentProfileId } from 'src/decorator/currentProfileId.decorator.';
import { RefreshTokenGuard } from 'src/guard/refreshToken.guard';
import { RatingInput } from 'src/dto/input/rating/rating-input';
import { RatingResponse } from 'src/dto/response/rating-response';
import { TagEntity } from 'src/entity/tag.entity';
import { TagBusiness } from 'src/business/tag.business';
import { TagListInput } from 'src/dto/input/tag/tag-list-input';
import { TagInsertInput } from 'src/dto/input/tag/tag-insert.input';
import { TagUpdateInput } from 'src/dto/input/tag/tag-update.input';
import { DeleteResponse } from 'src/dto/response/delete.response';

@Resolver(() => TagEntity)
export class TagResolver {
  constructor(private readonly tagBusiness: TagBusiness) {}

  @Public()
  @Query(() => [TagEntity])
  tags(@Args('tagListInput') tagListInput: TagListInput): Promise<TagEntity[]> {
    return this.tagBusiness.getAll(tagListInput);
  }

  @Public()
  @Query(() => TagEntity)
  tagByPk(@Args('id') id: string): Promise<TagEntity> {
    return this.tagBusiness.getById(id);
  }

  @Public()
  @Mutation(() => TagEntity)
  insertTag(
    @Args('tagInsertInput') tagInsertInput: TagInsertInput,
  ): Promise<TagEntity> {
    return this.tagBusiness.insert(tagInsertInput);
  }

  @Public()
  @Mutation(() => TagEntity)
  updateTag(
    @Args('tagUpdateInput') tagUpdateInput: TagUpdateInput,
  ): Promise<TagEntity> {
    return this.tagBusiness.update(tagUpdateInput);
  }

  @Public()
  @Mutation(() => DeleteResponse)
  deleteTag(@Args('id') id: string): Promise<DeleteResponse> {
    return this.tagBusiness.delete(id);
  }
}
