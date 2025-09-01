import { CheckoutEntity } from "./Checkout.entity";
import { ProductEntity } from "./Product.entity";
export declare class CheckoutItemEntity {
    id: number;
    checkout: CheckoutEntity;
    checkoutId: number;
    product: ProductEntity;
    price: number;
}
