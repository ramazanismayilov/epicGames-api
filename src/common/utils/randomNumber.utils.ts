export function generateOtpNumber(): number {
    return Math.floor(100000 + Math.random() * 900000)
}

export function generateOtpExpireDate(): Date {
    return new Date(Date.now() + 10 * 60 * 1000)
}