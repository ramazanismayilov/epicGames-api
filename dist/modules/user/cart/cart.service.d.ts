import { ClsService } from "nestjs-cls";
import { CartItemEntity } from "../../../entities/CartItem.entity";
import { DataSource } from "typeorm";
import { CartDto } from "./dto/cart.dto";
export declare class CartService {
    private cls;
    private dataSource;
    private cartRepo;
    private productRepo;
    constructor(cls: ClsService, dataSource: DataSource);
    getUserCartItems(): Promise<{
        data: CartItemEntity[];
    }>;
    addProductToCart(params: CartDto): Promise<{
        message: string;
    }>;
    removeProductFromCart(cartId: number): Promise<{
        message: string;
    }>;
    clearCart(): Promise<{
        message: string;
    }>;
}
