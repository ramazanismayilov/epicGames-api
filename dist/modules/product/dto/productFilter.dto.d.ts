import { PaginationDto } from "../../../common/dto/pagination.dto";
export declare class ProductFilterDto {
    search?: string;
}
export declare class ProductQueryDto extends PaginationDto {
    productFilterDto: ProductFilterDto;
}
