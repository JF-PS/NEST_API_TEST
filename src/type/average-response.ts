import { Prisma } from '@prisma/client';

export type TAverageResponse = Prisma.PrismaPromise<
  Prisma.GetRatingAggregateType<{
    where: {
      spotId: string;
    };
    _avg: {
      rate: true;
    };
    _count: {
      rate: true;
    };
  }>
>;
