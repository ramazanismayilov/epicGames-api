import { ProductEntity } from "./Product.entity";
export declare class GenreEntity {
    id: number;
    name: string;
    products: ProductEntity[];
    createdAt: Date;
    updatedAt: Date;
}
