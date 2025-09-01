"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePasswords = validatePasswords;
const common_1 = require("@nestjs/common");
function validatePasswords(newPassword, repeatPassword) {
    if (newPassword !== repeatPassword) {
        throw new common_1.BadRequestException('Passwords do not match');
    }
}
//# sourceMappingURL=password.utils.js.map