import { Type } from "class-transformer";
import { IsArray, IsInt, IsString } from "class-validator";

export class MenuCreateDto {
    @Type()
    @IsString()
    title: string

    @Type()
    @IsString()
    link: string

    @Type()
    @IsString()
    icon: string

    @Type(() => Number)
    @IsArray()
    @IsInt({ each: true })
    roles: number[];
}