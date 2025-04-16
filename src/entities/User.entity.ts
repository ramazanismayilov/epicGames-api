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

    @Column({ unique: true, nullable: true, type: 'varchar' })
    pendingEmail?: string | null

    @Column()
    password: string

    @Column()
    dateOfBirth: Date

    @Column()
    country: string

    @Column({ type: 'float', default: 0 })
    balance: number

    @Column()
    accountId: string

    @Column({ default: false })
    isVerified: boolean

    @Column({ type: 'int', nullable: true })
    otpCode?: number | null;
    
    @Column({ type: 'timestamp', nullable: true })
    otpExpiredAt?: Date | null;

    @ManyToOne(() => RoleEntity, (role) => role.users, { onDelete: 'SET NULL' })
    role: RoleEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}