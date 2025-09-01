import { ClsService } from "nestjs-cls";
import { CheckoutEntity } from "../../entities/Checkout.entity";
import { DataSource } from "typeorm";
import { CheckoutDto, CheckoutItemDto, CompleteCheckoutDto } from "./dto/checkout.dto";
export declare class CheckoutService {
    private cls;
    private dataSource;
    private cartItemRepo;
    private checkoutRepo;
    private checkoutItemRepo;
    private productRepo;
    private userRepo;
    constructor(cls: ClsService, dataSource: DataSource);
    getAllCheckouts(): Promise<CheckoutEntity[]>;
    getCheckoutById(checkoutId: number): Promise<CheckoutEntity>;
    getCheckoutsByUser(userId: number): Promise<CheckoutEntity[]>;
    createCheckout(params: CheckoutDto): Promise<{
        message: string;
    }>;
    completeCheckout(params: CompleteCheckoutDto): Promise<{
        message: string;
    }>;
    deleteCheckout(checkoutId: number): Promise<{
        message: string;
    }>;
    addProductToCheckout(checkoutId: number, params: CheckoutItemDto): Promise<{
        message: string;
    }>;
    removeProductFromCheckout(checkoutId: number, checkoutItemId: number): Promise<{
        message: string;
    }>;
}
