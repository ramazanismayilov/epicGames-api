import { ProductEntity } from "./Product.entity";
export declare class FeatureEntity {
    id: number;
    name: string;
    products: ProductEntity[];
    createdAt: Date;
    updatedAt: Date;
}
