import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoleEntity } from "./Role.entity";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column({ unique: true })
    username: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column()
    dateOfBirth: Date

    @Column()
    country: string

    @Column()
    accountId: string

    @Column({ default: false })
    isVerified: boolean

    @Column({ nullable: true })
    otpCode?: number | null;

    @Column({ nullable: true, type: 'timestamp' })
    otpExpiredAt?: Date | null;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => RoleEntity, (role) => role.users, { onDelete: 'SET NULL' })
    role: RoleEntity;

    @UpdateDateColumn()
    updatedAt: Date;
}