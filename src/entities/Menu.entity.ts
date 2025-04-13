import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User.entity";
import { RoleEntity } from "./Role.entity";

@Entity('menu')
export class MenuEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    link: string;

    @Column()
    icon: string;

    @OneToMany(() => UserEntity, user => user.role)
    users: UserEntity[]

    @ManyToMany(() => RoleEntity, (role) => role.menus)
    roles: RoleEntity[];
}