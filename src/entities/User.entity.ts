import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryColumn()
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
    dateOfBirth: string

    @Column()
    country: string

    @Column()
    accountId: string

    @Column()
    isActive: boolean

    @Column({ nullable: true })
    otpCode: number;

    @Column({ nullable: true, type: 'timestamp' })
    otpExpiredAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}