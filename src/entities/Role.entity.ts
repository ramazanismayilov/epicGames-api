import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User.entity";
import { MenuEntity } from "./Menu.entity";

@Entity('role')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => MenuEntity, (menu) => menu.roles)
    @JoinTable()
    menus: MenuEntity[];

    @OneToMany(() => UserEntity, user => user.role)
    users: UserEntity[]
}