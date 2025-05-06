import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsNumber, IsString, IsUUID, Min } from "class-validator";
import { AgeRestriction } from "../../../common/enums/ageRestriction.enum";

export class ProductDto {
    @Type()
    @IsArray()
    @IsUUID('4', { each: true })
    mediaId: string[];

    @Type()
    @IsString()
    name: string;

    @Type()
    @IsString()
    description: string;

    @Type()
    @IsBoolean()
    isFree: false

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