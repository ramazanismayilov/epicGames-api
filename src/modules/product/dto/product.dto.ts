import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Max, Min } from "class-validator";
import { AgeRestriction } from "../../../common/enums/ageRestriction.enum";

export class ProductDto {
    @Type()
    @IsArray()
    @IsUUID('4', { each: true })
    detailImageId: string[];

    @Type()
    @IsUUID('4')
    coverImageId: string

    @Type()
    @IsUUID('4')
    productLogoId: string

    @Type()
    @IsString()
    name: string;

    @Type()
    @IsString()
    description: string;

    @Type()
    @IsBoolean()
    isFree: boolean

    @Type()
    @IsNumber()
    @Min(0)
    price: number;

    @Type()
    @IsNumber()
    @Min(0)
    discount: number;

    @Type()
    @IsString()
    developer: string;

    @Type()
    @IsBoolean()
    isSilder: boolean

    @Type()
    @IsBoolean()
    isPin: boolean

    @Type()
    @IsString()
    publisher: string;

    @Type()
    @IsString()
    @IsEnum(AgeRestriction)
    ageRestriction: AgeRestriction;

    @Type()
    @IsArray()
    @IsNumber({}, { each: true })
    eventsId: number[];

    @Type()
    @IsArray()
    @IsNumber({}, { each: true })
    genresId: number[];

    @Type()
    @IsArray()
    @IsNumber({}, { each: true })
    typesId: number[];

    @Type()
    @IsArray()
    @IsNumber({}, { each: true })
    featuresId: number[];

    @Type()
    @IsArray()
    @IsNumber({}, { each: true })
    platformsId: number[];

    @Type()
    @IsArray()
    @IsNumber({}, { each: true })
    subscriptionsId: number[];
}

export class AddProductDto extends ProductDto { }
export class UpdateProductDto extends PartialType(ProductDto) { }
export class GetProductsDto {
    @Type()
    @IsOptional()
    @IsPositive()
    limit?: number;

    @Type()
    @IsOptional()
    @Min(1)
    page?: number;

    @Type()
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    isDiscount?: boolean;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    isFree?: boolean;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    isTopSeller?: boolean;

    @ApiPropertyOptional({
        enum: ['createdAt', 'price', 'name'],
        type: String,
    })
    @IsOptional()
    @IsString()
    sortBy?: 'createdAt' | 'price' | 'name';

    @ApiPropertyOptional({
        enum: ['ASC', 'DESC'],
        type: String,
    })
    @IsOptional()
    @IsString()
    order?: 'ASC' | 'DESC';

    @Type()
    @IsOptional()
    @IsArray()
    @Transform(({ value }) => (Array.isArray(value) ? value.map(Number) : [Number(value)]))
    eventId?: number[];

    @Type()
    @IsOptional()
    @IsArray()
    @Transform(({ value }) => (Array.isArray(value) ? value.map(Number) : [Number(value)]))
    genreId?: number[];

    @Type()
    @IsOptional()
    @IsArray()
    @Transform(({ value }) => (Array.isArray(value) ? value.map(Number) : [Number(value)]))
    typeId?: number[];

    @Type()
    @IsOptional()
    @IsArray()
    @Transform(({ value }) => (Array.isArray(value) ? value.map(Number) : [Number(value)]))
    featureId?: number[];

    @Type()
    @IsOptional()
    @IsArray()
    @Transform(({ value }) => (Array.isArray(value) ? value.map(Number) : [Number(value)]))
    platformId?: number[];

    @Type()
    @IsOptional()
    @IsArray()
    @Transform(({ value }) => (Array.isArray(value) ? value.map(Number) : [Number(value)]))
    subscriptionId?: number[];
}

