import { Type } from 'class-transformer';
import { IsString, IsUUID, Length } from 'class-validator';

export class ConfirmForgetPaswordDto {
    @Type()
    @IsString()
    @IsUUID()
    token: string;

    @Type()
    @IsString()
    @Length(6, 12)
    newPassword: string;

    @Type()
    @IsString()
    @Length(6, 12)
    repeatPassword: string;
}