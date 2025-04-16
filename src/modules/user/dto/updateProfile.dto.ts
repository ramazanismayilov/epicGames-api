import { Type } from "class-transformer";
import { IsOptional, IsString, Length } from "class-validator";
export class ProfileUpdateDto {
    @Type()
    @IsString()
    @IsOptional()
    firstname?: string

    @Type()
    @IsString()
    @IsOptional()
    lastname?: string

    @Type()
    @IsString()
    @Length(5, 20)
    @IsOptional()
    username?: string
}