import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, ValidateNested } from "class-validator";

export class CheckoutDto {
    @IsArray()
    @IsNumber({}, { each: true })
    productIds: number[];
}

export class CheckoutItemDto {
    @IsNumber()
    productId: number;
}

export class CompleteCheckoutDto {
    @IsArray()
    @Type(() => Number)
    @IsNumber({}, { each: true })
    checkoutIds: number[];
}