export function calculateDiscountedPrice(price: number, discount: number): number {
    if (discount && typeof discount === 'number' && discount > 0) {
        let x = ((price - (price * discount) / 100) * 10) / 10;
        return parseFloat((x.toFixed(2)))
    }
    return parseFloat(((price * 10) / 10).toFixed(2))
}
