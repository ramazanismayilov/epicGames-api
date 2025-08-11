import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsPositive, IsString, IsUUID, Min, ValidateNested } from "class-validator";

export class NewsDto {
    @Type()
    @IsString()
    @IsUUID('4', { each: true })
    mediaId: string;

    @Type()
    @IsString()
    title: string;

    @Type()
    @IsString()
    description: string;
}

export class AddNewsDto extends NewsDto { }
export class UpdateNewsDto extends PartialType(NewsDto) { }
export class GetNewsDto {
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
}

export class DragAndDropDto {
    @IsInt()
    @Min(1)
    order: number;
}