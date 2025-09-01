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
exports.WishlistController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const wishlist_service_1 = require("./wishlist.service");
const auth_decorator_1 = require("../../../common/decorators/auth.decorator");
const wishlist_dto_1 = require("./dto/wishlist.dto");
let WishlistController = class WishlistController {
    constructor(wishlistService) {
        this.wishlistService = wishlistService;
    }
    getUserWishlist() {
        return this.wishlistService.getUserWishlist();
    }
    toggleUserWishlistItem(body) {
        return this.wishlistService.toggleUserWishlistItem(body);
    }
    removeProductFromWishlist(id) {
        return this.wishlistService.removeProductFromWishlist(id);
    }
    clearWishlist() {
        return this.wishlistService.clearWishlist();
    }
};
exports.WishlistController = WishlistController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WishlistController.prototype, "getUserWishlist", null);
__decorate([
    (0, common_1.Post)('toggle'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wishlist_dto_1.WishlistDto]),
    __metadata("design:returntype", void 0)
], WishlistController.prototype, "toggleUserWishlistItem", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WishlistController.prototype, "removeProductFromWishlist", null);
__decorate([
    (0, common_1.Delete)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WishlistController.prototype, "clearWishlist", null);
exports.WishlistController = WishlistController = __decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Controller)('wishlist'),
    __metadata("design:paramtypes", [wishlist_service_1.WishlistService])
], WishlistController);
//# sourceMappingURL=wishlist.controller.js.map