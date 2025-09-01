import { CheckoutService } from "./checkout.service";
import { CheckoutDto, CheckoutItemDto, CompleteCheckoutDto } from "./dto/checkout.dto";
export declare class CheckoutController {
    private checkoutService;
    constructor(checkoutService: CheckoutService);
    getAllCheckouts(): Promise<import("../../entities/Checkout.entity").CheckoutEntity[]>;
    getCheckoutById(id: number): Promise<import("../../entities/Checkout.entity").CheckoutEntity>;
    getCheckoutsByUser(id: number): Promise<import("../../entities/Checkout.entity").CheckoutEntity[]>;
    createCheckout(body: CheckoutDto): Promise<{
        message: string;
    }>;
    completeCheckout(body: CompleteCheckoutDto): Promise<{
        message: string;
    }>;
    deleteCheckout(id: number): Promise<{
        message: string;
    }>;
    addProductToCheckout(id: number, body: CheckoutItemDto): Promise<{
        message: string;
    }>;
    removeProductFromCheckout(checkoutId: number, checkoutItemId: number): Promise<{
        message: string;
    }>;
}
