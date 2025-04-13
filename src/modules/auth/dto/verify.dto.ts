import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class VerifyOtpDto {
    @Type()
    @IsString()
    @IsEmail()
    email: string

    @Type()
    @IsNumber()
    otpCode: number
}