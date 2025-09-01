import { ProductEntity } from "./Product.entity";
export declare class TypeEntity {
    id: number;
    name: string;
    products: ProductEntity[];
    createdAt: Date;
    updatedAt: Date;
}
