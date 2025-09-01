import { AgeRestriction } from "../../../common/enums/ageRestriction.enum";
export declare class ProductDto {
    detailImageId: string[];
    coverImageId: string;
    productLogoId: string;
    name: string;
    description: string;
    isFree: boolean;
    price: number;
    discount: number;
    developer: string;
    isSilder: boolean;
    isPin: boolean;
    publisher: string;
    ageRestriction: AgeRestriction;
    eventsId: number[];
    genresId: number[];
    typesId: number[];
    featuresId: number[];
    platformsId: number[];
    subscriptionsId: number[];
}
export declare class AddProductDto extends ProductDto {
}
declare const UpdateProductDto_base: import("@nestjs/common").Type<Partial<ProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
}
export declare class GetProductsDto {
    limit?: number;
    page?: number;
    search?: string;
    isDiscount?: boolean;
    isFree?: boolean;
    isTopSeller?: boolean;
    sortBy?: 'createdAt' | 'price' | 'name';
    order?: 'ASC' | 'DESC';
    eventId?: number[];
    genreId?: number[];
    typeId?: number[];
    featureId?: number[];
    platformId?: number[];
    subscriptionId?: number[];
}
export {};
