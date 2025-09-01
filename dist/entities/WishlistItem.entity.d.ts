import { ProductEntity } from './Product.entity';
import { UserEntity } from './User.entity';
export declare class WishlistItemEntity {
    id: number;
    user: UserEntity;
    product: ProductEntity;
    createdAt: Date;
    updatedAt: Date;
}
