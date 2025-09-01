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
exports.UserEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const Role_entity_1 = require("./Role.entity");
const CartItem_entity_1 = require("./CartItem.entity");
const WishlistItem_entity_1 = require("./WishlistItem.entity");
const Checkout_entity_1 = require("./Checkout.entity");
const provider_enum_1 = require("../common/enums/provider.enum");
let UserEntity = class UserEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, firstname: { required: true, type: () => String }, lastname: { required: true, type: () => String }, username: { required: true, type: () => String }, email: { required: true, type: () => String }, pendingEmail: { required: false, type: () => String, nullable: true }, password: { required: true, type: () => String }, dateOfBirth: { required: true, type: () => Date }, country: { required: true, type: () => String }, balance: { required: true, type: () => Number }, accountId: { required: true, type: () => String }, isVerified: { required: true, type: () => Boolean }, otpCode: { required: false, type: () => Number, nullable: true }, otpExpiredAt: { required: false, type: () => Date, nullable: true }, refreshToken: { required: true, type: () => String, nullable: true }, refreshTokenDate: { required: true, type: () => Date, nullable: true }, provider: { required: true, enum: require("../common/enums/provider.enum").Provider }, providerId: { required: true, type: () => String }, role: { required: true, type: () => require("./Role.entity").RoleEntity }, cartItems: { required: true, type: () => [require("./CartItem.entity").CartItemEntity] }, wishlistItems: { required: true, type: () => [require("./WishlistItem.entity").WishlistItemEntity] }, checkouts: { required: true, type: () => [require("./Checkout.entity").CheckoutEntity] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], UserEntity.prototype, "pendingEmail", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], UserEntity.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "otpCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "otpExpiredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "refreshTokenDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: provider_enum_1.Provider, default: provider_enum_1.Provider.LOCAL }),
    __metadata("design:type", String)
], UserEntity.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "providerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Role_entity_1.RoleEntity, (role) => role.users, { onDelete: 'SET NULL' }),
    __metadata("design:type", Role_entity_1.RoleEntity)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CartItem_entity_1.CartItemEntity, (cartItem) => cartItem.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "cartItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => WishlistItem_entity_1.WishlistItemEntity, (wishlistItem) => wishlistItem.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "wishlistItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Checkout_entity_1.CheckoutEntity, (checkout) => checkout.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "checkouts", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)('user')
], UserEntity);
//# sourceMappingURL=User.entity.js.map