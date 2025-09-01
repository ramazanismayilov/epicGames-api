import { ClsService } from "nestjs-cls";
import { ProductEntity } from "../../entities/Product.entity";
import { DataSource } from "typeorm";
import { AddProductDto, GetProductsDto, UpdateProductDto } from "./dto/product.dto";
export declare class ProductService {
    private cls;
    private dataSource;
    private productRepo;
    private mediaRepo;
    private eventRepo;
    private genreRepo;
    private featureRepo;
    private platformRepo;
    private subscriptionRepo;
    private typeRepo;
    constructor(cls: ClsService, dataSource: DataSource);
    getAllProducts(query: GetProductsDto): Promise<{
        data: ProductEntity[];
        count: number;
        limit: number;
        page: number;
        totalPages: number;
    }>;
    getProduct(productId: number): Promise<ProductEntity>;
    addProduct(params: AddProductDto): Promise<{
        message: string;
        product: ProductEntity;
    }>;
    updateProduct(productId: number, params: UpdateProductDto): Promise<{
        message: string;
        updatedProduct: ProductEntity;
    }>;
    deleteProduct(productId: number): Promise<{
        message: string;
    }>;
}
