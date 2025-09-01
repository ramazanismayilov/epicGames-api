import { ProductEntity } from "./Product.entity";
export declare class EventEntity {
    id: number;
    name: string;
    products: ProductEntity[];
    createdAt: Date;
    updatedAt: Date;
}
