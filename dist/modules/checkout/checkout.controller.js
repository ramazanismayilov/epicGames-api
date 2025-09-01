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
exports.CheckoutController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const checkout_service_1 = require("./checkout.service");
const checkout_dto_1 = require("./dto/checkout.dto");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
let CheckoutController = class CheckoutController {
    constructor(checkoutService) {
        this.checkoutService = checkoutService;
    }
    getAllCheckouts() {
        return this.checkoutService.getAllCheckouts();
    }
    getCheckoutById(id) {
        return this.checkoutService.getCheckoutById(id);
    }
    getCheckoutsByUser(id) {
        return this.checkoutService.getCheckoutsByUser(id);
    }
    createCheckout(body) {
        return this.checkoutService.createCheckout(body);
    }
    completeCheckout(body) {
        return this.checkoutService.completeCheckout(body);
    }
    deleteCheckout(id) {
        return this.checkoutService.deleteCheckout(id);
    }
    addProductToCheckout(id, body) {
        return this.checkoutService.addProductToCheckout(id, body);
    }
    removeProductFromCheckout(checkoutId, checkoutItemId) {
        return this.checkoutService.removeProductFromCheckout(checkoutId, checkoutItemId);
    }
};
exports.CheckoutController = CheckoutController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../../entities/Checkout.entity").CheckoutEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CheckoutController.prototype, "getAllCheckouts", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../../entities/Checkout.entity").CheckoutEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CheckoutController.prototype, "getCheckoutById", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    openapi.ApiResponse({ status: 200, type: [require("../../entities/Checkout.entity").CheckoutEntity] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CheckoutController.prototype, "getCheckoutsByUser", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [checkout_dto_1.CheckoutDto]),
    __metadata("design:returntype", void 0)
], CheckoutController.prototype, "createCheckout", null);
__decorate([
    (0, common_1.Post)('complete'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [checkout_dto_1.CompleteCheckoutDto]),
    __metadata("design:returntype", void 0)
], CheckoutController.prototype, "completeCheckout", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CheckoutController.prototype, "deleteCheckout", null);
__decorate([
    (0, common_1.Post)(':id/addProduct'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, checkout_dto_1.CheckoutItemDto]),
    __metadata("design:returntype", void 0)
], CheckoutController.prototype, "addProductToCheckout", null);
__decorate([
    (0, common_1.Delete)(':checkoutId/checkoutItems/:checkoutItemId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('checkoutId')),
    __param(1, (0, common_1.Param)('checkoutItemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], CheckoutController.prototype, "removeProductFromCheckout", null);
exports.CheckoutController = CheckoutController = __decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Controller)('checkouts'),
    __metadata("design:paramtypes", [checkout_service_1.CheckoutService])
], CheckoutController);
//# sourceMappingURL=checkout.controller.js.map