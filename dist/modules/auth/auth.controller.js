"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const register_dto_1 = require("./dto/register.dto");
const verify_dto_1 = require("./dto/verify.dto");
const login_dto_1 = require("./dto/login.dto");
const refreshToken_dto_1 = require("./dto/refreshToken.dto");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const create_forget_password_dto_1 = require("./dto/create-forget-password.dto");
const confirm_forget_password_dto_1 = require("./dto/confirm-forget-password.dto");
const resent_otp_dto_1 = require("./dto/resent-otp.dto");
const firebase_dto_1 = require("./dto/firebase.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(body) {
        return this.authService.login(body);
    }
    register(body) {
        return this.authService.register(body);
    }
    async firebase(body) {
        return this.authService.firebase(body);
    }
    verifyOtp(body) {
        return this.authService.verifyOtp(body);
    }
    resendOtp(body) {
        return this.authService.resendOtp(body);
    }
    async refreshToken(body) {
        return this.authService.refreshToken(body);
    }
    resetPassword(body) {
        return this.authService.resetPassword(body);
    }
    createForgetPasswordRequest(body) {
        return this.authService.createForgetPasswordRequest(body);
    }
    confirmPassword(body) {
        return this.authService.confirmForgetPassword(body);
    }
    async verify(token) {
        return this.authService.verifyToken(token);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('firebase'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [firebase_dto_1.FirebaseDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "firebase", null);
__decorate([
    (0, common_1.Post)('verifyOtp'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Post)('resentOtp'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resent_otp_dto_1.ResentOtpDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resendOtp", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refreshToken_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, auth_decorator_1.Auth)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('forget-password'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_forget_password_dto_1.CreateForgetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "createForgetPasswordRequest", null);
__decorate([
    (0, common_1.Post)('forget-password/confirm'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirm_forget_password_dto_1.ConfirmForgetPaswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "confirmPassword", null);
__decorate([
    (0, common_1.Get)('verify-token/:token'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verify", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map