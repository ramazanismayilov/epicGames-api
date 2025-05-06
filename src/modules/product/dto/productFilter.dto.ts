import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { PaginationDto } from "../../../common/dto/pagination.dto";

export class ProductFilterDto {
    @Type()
    @IsString()
    @IsOptional()
    search?: string;
}

export class ProductQueryDto extends PaginationDto {
    @ValidateNested()
    @Type(() => ProductFilterDto)
    productFilterDto: ProductFilterDto;
  }
  