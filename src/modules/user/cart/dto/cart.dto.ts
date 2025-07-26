import { Type } from "class-transformer";
import { IsIn, IsInt, IsNumber, IsOptional, Min } from "class-validator";

export class CartDto {
    @Type()
    @IsNumber()
    productId: number;
}
