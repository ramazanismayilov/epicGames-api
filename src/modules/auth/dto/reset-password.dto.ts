import { Type } from "class-transformer";
import { IsEmail, IsString, Length } from "class-validator";

export class ResetPasswordDto {
    @Type()
    @IsString()
    @Length(6, 12)
    currentPassword: string;

    @Type()
    @IsString()
    @Length(6, 12)
    newPassword: string;

    @Type()
    @IsString()
    @Length(6, 12)
    repeatPassword: string;
}