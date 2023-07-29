import { Injectable } from '@nestjs/common';
import { TagListInput } from 'src/dto/input/tag/tag-list-input';
import { PrismaService } from 'src/service/prisma.service';

@Injectable()
export class TagRepository {
  constructor(private prisma: PrismaService) {}

  async getAll(filterData?: TagListInput) {
    const { searchValue = '' } = filterData;
    return this.prisma.tag.findMany({
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
  }
}
