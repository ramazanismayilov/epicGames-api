import { RoleEntity } from "./Role.entity";
export declare class MenuEntity {
    id: number;
    title: string;
    link: string;
    icon: string;
    roles: RoleEntity[];
    createdAt: Date;
    updatedAt: Date;
}
