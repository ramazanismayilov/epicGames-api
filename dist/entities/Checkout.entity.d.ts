import { UserEntity } from "./User.entity";
import { CheckoutStatus } from "../common/enums/checkout.enum";
import { CheckoutItemEntity } from "./CheckoutItem.entity";
export declare class CheckoutEntity {
    id: number;
    user: UserEntity;
    items: CheckoutItemEntity[];
    totalAmount: number;
    status: CheckoutStatus;
    createdAt: Date;
    updatedAt: Date;
}
