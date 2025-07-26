import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CheckoutEntity } from "./Checkout.entity";
import { ProductEntity } from "./Product.entity";
import { Exclude } from "class-transformer";

@Entity('checkout_item')
export class CheckoutItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Exclude()
    @ManyToOne(() => CheckoutEntity, checkout => checkout.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'checkoutId' })
    checkout: CheckoutEntity;

    @Column()
    checkoutId: number;

    @ManyToOne(() => ProductEntity, { eager: true })
    product: ProductEntity;

    @Column('float')
    price: number;
}
