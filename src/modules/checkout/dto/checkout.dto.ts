import { Type } from "class-transformer";
import { IsArray, IsNumber, Min, ValidateNested } from "class-validator";

export class CheckoutDto {
    @Type()
    @IsArray()
    @IsNumber({}, { each: true })
    productIds: number[];
}
