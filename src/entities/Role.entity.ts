import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./User.entity";
import { MenuEntity } from "./Menu.entity";
import { Role } from "../common/enums/role.enum";

@Entity('role')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'enum', enum: Role, default: Role.USER, unique: true })
    name: Role

    @ManyToMany(() => MenuEntity, (menu) => menu.roles)
    @JoinTable()
    menus: MenuEntity[];

    @OneToMany(() => UserEntity, user => user.role)
    users: UserEntity[]

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;
}