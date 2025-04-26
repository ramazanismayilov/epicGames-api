export function calculateDiscountedPrice(price: number, discount: number): number {
    if (discount && typeof discount === 'number' && discount > 0) {
        return Math.round((price - (price * discount) / 100) * 10) / 10;
    }
    return Math.round(price * 10) / 10;
}
