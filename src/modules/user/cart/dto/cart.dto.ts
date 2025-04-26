import { Type } from "class-transformer";
import { IsIn, IsInt, IsNumber, IsOptional, Min } from "class-validator";

export class CartDto {
    @Type()
    @IsNumber()
    productId: number;

    @Type()
    @IsOptional()
    @IsNumber()
    @Min(1)
    quantity?: number;
}

export class UpdateCartItemQuantityDto {
    @Type()
    @IsInt()
    @IsIn([1, -1])
    change: number;
}
