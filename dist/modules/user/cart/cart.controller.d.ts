import { CartService } from "./cart.service";
import { CartDto } from "./dto/cart.dto";
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
    getUserCartItems(): Promise<{
        data: import("../../../entities/CartItem.entity").CartItemEntity[];
    }>;
    addProductToCart(body: CartDto): Promise<{
        message: string;
    }>;
    removeProductFromCart(id: number): Promise<{
        message: string;
    }>;
    clearCart(): Promise<{
        message: string;
    }>;
}
