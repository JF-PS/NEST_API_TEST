import { plainToClass as plainClass } from 'class-transformer';

export function plainToClass<TModel, TEntity>(
  plainObject: TModel,
  targetClass: new () => TEntity,
): TEntity {
  return plainClass(targetClass, plainObject);
}

export function plainToClassMany<TModel, TEntity>(
  plainList: TModel[],
  targetClass: new () => TEntity,
): TEntity[] {
  return plainList.map((plainItem) => plainClass(targetClass, plainItem));
}
