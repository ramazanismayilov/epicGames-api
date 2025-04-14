import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class IncreaseBalanceDto{
    @Type()
    @IsNumber()
    @Min(1)
    balance: number
}