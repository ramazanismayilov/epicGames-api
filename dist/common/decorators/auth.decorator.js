"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../guards/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const Auth = () => {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(auth_guard_1.AuthGuard), (0, swagger_1.ApiBearerAuth)());
};
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map