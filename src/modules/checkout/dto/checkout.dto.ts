import { Type } from "class-transformer";
import { IsArray, IsNumber, Min, ValidateNested } from "class-validator";

class CheckoutItemDto {
    @Type()
    @IsNumber()
    productId: number;

    @Type()
    @IsNumber()
    @Min(1)
    quantity: number;
}

export class CheckoutDto {
    @Type()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CheckoutItemDto)
    items: CheckoutItemDto[];
}