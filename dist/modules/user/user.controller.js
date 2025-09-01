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
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
const increaseBalance_dto_1 = require("./dto/increaseBalance.dto");
const updateProfile_dto_1 = require("./dto/updateProfile.dto");
const updateEmail_dto_1 = require("./dto/updateEmail.dto");
const verifyNewEmail_dto_1 = require("./dto/verifyNewEmail.dto");
const setUserRole_dto_1 = require("./dto/setUserRole.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getUsers() {
        return this.userService.getUsers();
    }
    getUser(id) {
        return this.userService.getUser(id);
    }
    async updateProfile(body) {
        return this.userService.updateProfile(body);
    }
    async updateEmail(body) {
        return this.userService.updateEmail(body);
    }
    async verifyNewEmail(body) {
        return this.userService.verifyNewEmail(body);
    }
    async deleteUser(id) {
        return this.userService.deleteUser(id);
    }
    async increaseBalance(body) {
        return this.userService.increaseBalance(body);
    }
    async setUserRole(id, body) {
        return this.userService.setUserRole(id, body);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../../entities/User.entity").UserEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../../entities/User.entity").UserEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)('updateProfile'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateProfile_dto_1.ProfileUpdateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)('updateEmail'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateEmail_dto_1.EmailUpdateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateEmail", null);
__decorate([
    (0, common_1.Post)('verifyNewEmail'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verifyNewEmail_dto_1.VerifyNewEmailDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyNewEmail", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)('increaseBalance'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [increaseBalance_dto_1.IncreaseBalanceDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "increaseBalance", null);
__decorate([
    (0, common_1.Post)(':id/setRole'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, setUserRole_dto_1.SetUserRoleDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setUserRole", null);
exports.UserController = UserController = __decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map