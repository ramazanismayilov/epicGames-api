"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDiscountedPrice = calculateDiscountedPrice;
function calculateDiscountedPrice(price, discount) {
    if (discount && typeof discount === 'number' && discount > 0) {
        let x = ((price - (price * discount) / 100) * 10) / 10;
        return parseFloat((x.toFixed(2)));
    }
    return parseFloat(((price * 10) / 10).toFixed(2));
}
//# sourceMappingURL=calculateDiscountPrice.utils.js.map