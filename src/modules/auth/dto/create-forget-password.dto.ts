import { Type } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class CreateForgetPasswordDto {
    @Type()
    @IsString()
    @IsEmail()
    email: string;

    @Type()
    @IsString()
    callbackURL: string = 'http://localhost:3000/forget-password.html';
}