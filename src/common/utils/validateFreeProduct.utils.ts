import { BadRequestException } from "@nestjs/common";

export function validatePriceAndDiscount(isFree: boolean, price?: number, discount?: number) {
    if (isFree) {
        if (price !== undefined && price !== 0) throw new BadRequestException('Free product should not have a price')
        if (discount !== undefined && discount !== 0) throw new BadRequestException('Free product should not have a discount')
    } else {
        if (typeof price !== 'number' || price <= 0) throw new BadRequestException('Price must be provided and greater than 0 for non-free products')
        if (typeof discount !== 'number' || discount < 0) throw new BadRequestException('Discount must be provided and cannot be negative for non-free products')
    }
}
