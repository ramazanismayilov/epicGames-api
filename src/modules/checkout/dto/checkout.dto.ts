import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, ValidateNested } from "class-validator";

export class CheckoutDto {
    @ValidateNested({ each: true })
    @Type(() => CheckoutItemDto)
    @IsArray()
    items: CheckoutItemDto[];
}
export class CheckoutItemDto {
    @Type()
    @IsNumber()
    productId: number;

    @Type()
    @IsNumber()
    @IsOptional()
    quantity?: number;
}