import { Injectable } from '@nestjs/common';

import { TagEntity } from 'src/entity/tag.entity';
import { PrismaService } from 'src/service/prisma.service';
import { plainToClassMany, plainToClass } from 'src/utils/plain-to-class';
import { TagListInput } from 'src/dto/input/tag/tag-list-input';
import { TagInsertInput } from 'src/dto/input/tag/tag-insert.input';
import { TagUpdateInput } from 'src/dto/input/tag/tag-update.input';

@Injectable()
export class TagRepository {
  constructor(private prisma: PrismaService) {}

  async getAll(filterData?: TagListInput): Promise<TagEntity[]> {
    const { searchValue = '' } = filterData;
    const tags = await this.prisma.tag.findMany({
      where: {
        category: filterData?.category,
        id: {
          in: filterData?.ids,
        },
        name: {
          contains: searchValue,
        },
      },
    });

    return plainToClassMany(tags, TagEntity);
  }

  async getById(id: string): Promise<TagEntity> {
    const tag = await this.prisma.tag.findUnique({ where: { id } });
    return plainToClass(tag, TagEntity);
  }

  async create(data: TagInsertInput): Promise<TagEntity> {
    const tag = await this.prisma.tag.create({ data });
    return plainToClass(tag, TagEntity);
  }

  async update(data: TagUpdateInput): Promise<TagEntity> {
    const { id, tagPictureUrl } = data;
    const tag = await this.prisma.tag.update({
      where: { id },
      data: { tagPictureUrl },
    });
    return plainToClass(tag, TagEntity);
  }

  async delete(id: string): Promise<boolean> {
    return this.prisma.tag
      .delete({ where: { id } })
      .then(() => true)
      .catch(() => false);
  }
}
