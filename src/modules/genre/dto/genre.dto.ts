import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class GenreDto {
    @Type()
    @IsString()
    name: string;
}

export class AddGenreDto extends GenreDto { }
export class UpdateGenreDto extends PartialType(GenreDto) { }