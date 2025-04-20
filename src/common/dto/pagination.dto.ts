import { Type } from "class-transformer"
import { IsNumber, Min } from "class-validator"

export class PaginationDto {
    @Type()
    @IsNumber()
    @Min(1)
    page: number

    @Type()
    @IsNumber()
    @Min(1)
    pageSize: number
}