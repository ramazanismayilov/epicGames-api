import { ProductService } from "./product.service";
import { AddProductDto, GetProductsDto, UpdateProductDto } from "./dto/product.dto";
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getAllProducts(query: GetProductsDto): Promise<{
        data: import("../../entities/Product.entity").ProductEntity[];
        count: number;
        limit: number;
        page: number;
        totalPages: number;
    }>;
    getProduct(id: number): Promise<import("../../entities/Product.entity").ProductEntity>;
    addProduct(body: AddProductDto): Promise<{
        message: string;
        product: import("../../entities/Product.entity").ProductEntity;
    }>;
    updateProduct(id: number, body: UpdateProductDto): Promise<{
        message: string;
        updatedProduct: import("../../entities/Product.entity").ProductEntity;
    }>;
    deleteProduct(id: number): Promise<{
        message: string;
    }>;
}
