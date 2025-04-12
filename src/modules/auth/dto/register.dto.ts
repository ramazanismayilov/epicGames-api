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
    @Length(5, 15)
    username: string

    @Type()
    @IsString()
    @IsEmail()
    email: string

    @Type(() => Date)
    @IsDate()
    birthDate: Date

    @Type()
    @IsString()
    @Length(6, 12)
    password: string;
}