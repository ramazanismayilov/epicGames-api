import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./User.entity";
import { CheckoutItemEntity } from "./CheckoutItem.entity";

@Entity('checkout')
export class CheckoutEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity, (user) => user.checkouts)
    user: UserEntity;

    @OneToMany(() => CheckoutItemEntity, (checkoutItem) => checkoutItem.checkout, { cascade: true})
    items: CheckoutItemEntity[];

    @Column('float')
    totalAmount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
