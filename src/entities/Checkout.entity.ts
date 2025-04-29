import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./User.entity";
import { ProductEntity } from "./Product.entity";
import { CheckoutStatus } from "src/common/enums/checkout.enum";

@Entity('checkout')
export class CheckoutEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity, (user) => user.checkouts)
    user: UserEntity;

    @ManyToMany(() => ProductEntity)
    @JoinTable({ name: 'product_checkout' })
    products: ProductEntity[];

    @Column('float')
    totalAmount: number;

    @Column({ type: 'enum', enum: CheckoutStatus, default: CheckoutStatus.INPROGRESS })
    status: CheckoutStatus

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
