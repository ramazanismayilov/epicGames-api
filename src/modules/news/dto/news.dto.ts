import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsUUID } from "class-validator";

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