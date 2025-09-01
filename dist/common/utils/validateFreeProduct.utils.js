"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePriceAndDiscount = validatePriceAndDiscount;
const common_1 = require("@nestjs/common");
function validatePriceAndDiscount(isFree, price, discount) {
    if (isFree) {
        if (price !== undefined && price !== 0)
            throw new common_1.BadRequestException('Free product should not have a price');
        if (discount !== undefined && discount !== 0)
            throw new common_1.BadRequestException('Free product should not have a discount');
    }
    else {
        if (typeof price !== 'number' || price <= 0)
            throw new common_1.BadRequestException('Price must be provided and greater than 0 for non-free products');
        if (typeof discount !== 'number' || discount < 0)
            throw new common_1.BadRequestException('Discount must be provided and cannot be negative for non-free products');
    }
}
//# sourceMappingURL=validateFreeProduct.utils.js.map