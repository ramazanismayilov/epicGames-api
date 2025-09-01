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
exports.CheckoutEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const checkout_enum_1 = require("../common/enums/checkout.enum");
const CheckoutItem_entity_1 = require("./CheckoutItem.entity");
const class_transformer_1 = require("class-transformer");
let CheckoutEntity = class CheckoutEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, user: { required: true, type: () => require("./User.entity").UserEntity }, items: { required: true, type: () => [require("./CheckoutItem.entity").CheckoutItemEntity] }, totalAmount: { required: true, type: () => Number }, status: { required: true, enum: require("../common/enums/checkout.enum").CheckoutStatus }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.CheckoutEntity = CheckoutEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CheckoutEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity, (user) => user.checkouts, { onDelete: 'CASCADE' }),
    __metadata("design:type", User_entity_1.UserEntity)
], CheckoutEntity.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.OneToMany)(() => CheckoutItem_entity_1.CheckoutItemEntity, item => item.checkout, { cascade: true }),
    __metadata("design:type", Array)
], CheckoutEntity.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], CheckoutEntity.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: checkout_enum_1.CheckoutStatus, default: checkout_enum_1.CheckoutStatus.INPROGRESS }),
    __metadata("design:type", String)
], CheckoutEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CheckoutEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CheckoutEntity.prototype, "updatedAt", void 0);
exports.CheckoutEntity = CheckoutEntity = __decorate([
    (0, typeorm_1.Entity)('checkout')
], CheckoutEntity);
//# sourceMappingURL=Checkout.entity.js.map