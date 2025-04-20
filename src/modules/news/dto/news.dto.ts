import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString, IsUUID, Min } from "class-validator";

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

export class NewsPagination {
    @Type()
    @IsNumber()
    @Min(1)
    page: number

    @Type()
    @IsNumber()
    @Min(1)
    pageSize: number
}