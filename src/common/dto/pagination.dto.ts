import { Type } from "class-transformer"
import { IsOptional, IsPositive, Min } from "class-validator"

export class PaginationDto {
    @Type()
    @IsOptional()
    @IsPositive()
    limit?: number;

    @Type()
    @IsOptional()
    @Min(0)
    offset?: number;
}