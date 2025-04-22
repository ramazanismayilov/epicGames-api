import { NotFoundException } from '@nestjs/common';
import { Repository, In, ObjectLiteral } from 'typeorm';

export async function findOneOrFail<T extends ObjectLiteral>(repo: Repository<T>, id: number | string, entityName = 'Entity'): Promise<T> {
  const entity = await repo.findOne({ where: { id } as any });
  if (!entity) throw new NotFoundException(`${entityName} not found`);
  return entity;
}

export async function findManyOrFail<T extends ObjectLiteral>(repo: Repository<T>,ids: number[],entityName = 'Entities'): Promise<T[]> {
  const entities = await repo.findBy({ id: In(ids) } as any);
  if (entities.length !== ids.length) throw new NotFoundException(`Some ${entityName.toLowerCase()} not found`);
  return entities;
}
