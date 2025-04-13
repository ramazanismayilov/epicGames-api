import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
    @Type()
    @IsString()
    refreshToken: string;
}
