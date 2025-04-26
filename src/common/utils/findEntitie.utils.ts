import { NotFoundException } from "@nestjs/common";
import { In, ObjectLiteral, Repository } from "typeorm";

export async function findEntitiesByIds<T extends ObjectLiteral>(repo: Repository<T>, ids: any[], entityName: string): Promise<T[]> {
  const entities = await repo.findBy({ id: In(ids) as any });
  if (entities.length !== ids.length) throw new NotFoundException(`Some ${entityName} ids not found`);
  return entities;
}
