import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_activation')
export class UserActivationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    token: string;

    @Column({ type: 'timestamptz' })
    expiredAt: Date;
}