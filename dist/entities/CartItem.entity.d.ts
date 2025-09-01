import { ProductEntity } from './Product.entity';
import { UserEntity } from './User.entity';
export declare class CartItemEntity {
    id: number;
    user: UserEntity;
    product: ProductEntity;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
}
