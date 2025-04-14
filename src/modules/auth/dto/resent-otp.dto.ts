import { Type } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class ResentOtpDto {
    @Type()
    @IsString()
    @IsEmail()
    email: string
}