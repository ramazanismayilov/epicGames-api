import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, ValidateNested } from "class-validator";

export class CheckoutDto {
    @ValidateNested({ each: true })
    @Type(() => CheckoutItemDto)
    @IsArray()
    items: CheckoutItemDto[];
}
class CheckoutItemDto {
    @Type()
    @IsNumber()
    productId: number;

    @Type()
    @IsNumber()
    @IsOptional()
    quantity?: number;
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