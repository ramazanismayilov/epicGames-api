import { UserEntity } from "./User.entity";
import { MenuEntity } from "./Menu.entity";
import { Role } from "../common/enums/role.enum";
export declare class RoleEntity {
    id: number;
    name: Role;
    menus: MenuEntity[];
    users: UserEntity[];
    createdAt: Date;
    updatedAt: Date;
}
