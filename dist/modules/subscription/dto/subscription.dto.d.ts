export declare class SubscriptionDto {
    name: string;
}
export declare class AddSubscriptionDto extends SubscriptionDto {
}
declare const UpdateSubscriptionDto_base: import("@nestjs/common").Type<Partial<SubscriptionDto>>;
export declare class UpdateSubscriptionDto extends UpdateSubscriptionDto_base {
}
export {};
