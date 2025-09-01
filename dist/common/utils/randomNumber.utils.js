"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtpNumber = generateOtpNumber;
exports.generateOtpExpireDate = generateOtpExpireDate;
function generateOtpNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}
function generateOtpExpireDate() {
    return new Date(Date.now() + 10 * 60 * 1000);
}
//# sourceMappingURL=randomNumber.utils.js.map