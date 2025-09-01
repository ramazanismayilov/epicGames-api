import { ObjectLiteral, Repository } from "typeorm";
export declare function findEntitiesByIds<T extends ObjectLiteral>(repo: Repository<T>, ids: any[], entityName: string): Promise<T[]>;
