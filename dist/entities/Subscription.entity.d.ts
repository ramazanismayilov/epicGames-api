import { ProductEntity } from "./Product.entity";
export declare class SubscriptionEntity {
    id: number;
    name: string;
    products: ProductEntity[];
    createdAt: Date;
    updatedAt: Date;
}
