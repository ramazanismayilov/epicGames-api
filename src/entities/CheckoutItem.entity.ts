import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CheckoutEntity } from './Checkout.entity';
import { ProductEntity } from './Product.entity';

@Entity('checkout_item')
export class CheckoutItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CheckoutEntity, (checkout) => checkout.items)
    checkout: CheckoutEntity;

    @ManyToOne(() => ProductEntity)
    product: ProductEntity;

    @Column()
    quantity: number;

    @Column('float')
    price: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
