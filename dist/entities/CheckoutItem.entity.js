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
exports.CheckoutItemEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const Checkout_entity_1 = require("./Checkout.entity");
const Product_entity_1 = require("./Product.entity");
const class_transformer_1 = require("class-transformer");
let CheckoutItemEntity = class CheckoutItemEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, checkout: { required: true, type: () => require("./Checkout.entity").CheckoutEntity }, checkoutId: { required: true, type: () => Number }, product: { required: true, type: () => require("./Product.entity").ProductEntity }, price: { required: true, type: () => Number } };
    }
};
exports.CheckoutItemEntity = CheckoutItemEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CheckoutItemEntity.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.ManyToOne)(() => Checkout_entity_1.CheckoutEntity, checkout => checkout.items, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'checkoutId' }),
    __metadata("design:type", Checkout_entity_1.CheckoutEntity)
], CheckoutItemEntity.prototype, "checkout", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CheckoutItemEntity.prototype, "checkoutId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_entity_1.ProductEntity, { eager: true }),
    __metadata("design:type", Product_entity_1.ProductEntity)
], CheckoutItemEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], CheckoutItemEntity.prototype, "price", void 0);
exports.CheckoutItemEntity = CheckoutItemEntity = __decorate([
    (0, typeorm_1.Entity)('checkout_item')
], CheckoutItemEntity);
//# sourceMappingURL=CheckoutItem.entity.js.map