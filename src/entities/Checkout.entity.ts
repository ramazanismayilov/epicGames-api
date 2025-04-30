import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./User.entity";
import { CheckoutStatus } from "src/common/enums/checkout.enum";
import { CheckoutItemEntity } from "./CheckoutItem.entity";
import { Expose } from "class-transformer";

@Entity('checkout')
export class CheckoutEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity, (user) => user.checkouts)
    user: UserEntity;

    @Expose()
    @OneToMany(() => CheckoutItemEntity, item => item.checkout, { cascade: true })
    items: CheckoutItemEntity[];

    @Column('float')
    totalAmount: number;

    @Column({ type: 'enum', enum: CheckoutStatus, default: CheckoutStatus.INPROGRESS })
    status: CheckoutStatus

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
