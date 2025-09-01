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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistItemEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const Product_entity_1 = require("./Product.entity");
const User_entity_1 = require("./User.entity");
let WishlistItemEntity = class WishlistItemEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, user: { required: true, type: () => require("./User.entity").UserEntity }, product: { required: true, type: () => require("./Product.entity").ProductEntity }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.WishlistItemEntity = WishlistItemEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WishlistItemEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity, (user) => user.wishlistItems, { onDelete: 'CASCADE' }),
    __metadata("design:type", User_entity_1.UserEntity)
], WishlistItemEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_entity_1.ProductEntity, { onDelete: 'CASCADE' }),
    __metadata("design:type", Product_entity_1.ProductEntity)
], WishlistItemEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], WishlistItemEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], WishlistItemEntity.prototype, "updatedAt", void 0);
exports.WishlistItemEntity = WishlistItemEntity = __decorate([
    (0, typeorm_1.Entity)('wishlist_item')
], WishlistItemEntity);
//# sourceMappingURL=WishlistItem.entity.js.map