import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CheckoutEntity } from "./Checkout.entity";
import { ProductEntity } from "./Product.entity";
import { Exclude } from "class-transformer";

@Entity('checkout_item')
export class CheckoutItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Exclude()
    @ManyToOne(() => CheckoutEntity, checkout => checkout.items, { onDelete: 'CASCADE' })
    checkout: CheckoutEntity;

    @ManyToOne(() => ProductEntity, { eager: true })
    product: ProductEntity;

    @Column()
    quantity: number;

    @Column('float')
    price: number; 
}
