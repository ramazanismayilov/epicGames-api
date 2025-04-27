import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class WishlistDto {
    @Type()
    @IsNumber()
    productId: number;
}
