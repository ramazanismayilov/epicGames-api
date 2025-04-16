import { Type } from "class-transformer";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class EmailUpdateDto {
    @Type()
    @IsString()
    @IsEmail()
    @IsOptional()
    email?: string
}