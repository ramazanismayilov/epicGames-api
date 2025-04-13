import { Type } from "class-transformer";
import { IsDate, IsEmail, IsString, Length } from "class-validator";

export class RegisterDto {
    @Type()
    @IsString()
    firstname: string

    @Type()
    @IsString()
    lastname: string

    @Type()
    @IsString()
    @Length(5, 20)
    username: string

    @Type()
    @IsString()
    @IsEmail()
    email: string

    @Type()
    @IsString()
    @Length(6, 12)
    password: string;

    @Type(() => Date)
    @IsDate()
    dateOfBirth: Date

    @Type()
    @IsString()
    country: string;
}