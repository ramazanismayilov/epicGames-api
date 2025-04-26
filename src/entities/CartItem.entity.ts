import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProductEntity } from './Product.entity';
import { UserEntity } from './User.entity';

@Entity('cart_item')
export class CartItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.cartItems, { onDelete: 'CASCADE' })
    user: UserEntity;

    @ManyToOne(() => ProductEntity, { onDelete: 'CASCADE' })
    product: ProductEntity;

    @Column({ type: 'int', default: 1 })
    quantity: number;

    @Column()
    totalPrice: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
