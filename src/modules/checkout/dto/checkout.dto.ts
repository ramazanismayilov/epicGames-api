import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, Min, ValidateNested } from "class-validator";

class CheckoutItemDto {
    @Type()
    @IsNumber()
    productId: number;

    @Type()
    @IsNumber()
    quantity: number;
}

export class CheckoutDto {
    @ValidateNested({ each: true })
    @Type(() => CheckoutItemDto)
    @IsArray()
    items: CheckoutItemDto[];
}

export class AddProductToCheckoutDto {
    @Type()
    @IsNumber()
    productId: number;

    @Type()
    @IsNumber()
    @IsOptional()
    quantity?: number;
}