import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class VerifyNewEmailDto{
    @Type()
    @IsEmail()
    @IsString()
    email: string

    @Type()
    @IsNumber()
    otpCode: number
}