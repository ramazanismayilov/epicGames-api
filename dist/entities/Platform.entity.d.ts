import { ProductEntity } from "./Product.entity";
export declare class PlatformEntity {
    id: number;
    name: string;
    products: ProductEntity[];
    createdAt: Date;
    updatedAt: Date;
}
