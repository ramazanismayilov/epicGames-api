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
exports.ProductEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const Media_entity_1 = require("./Media.entity");
const Genre_entity_1 = require("./Genre.entity");
const Feature_entity_1 = require("./Feature.entity");
const Platform_entity_1 = require("./Platform.entity");
const Event_entity_1 = require("./Event.entity");
const Subscription_entity_1 = require("./Subscription.entity");
const ageRestriction_enum_1 = require("../common/enums/ageRestriction.enum");
const Type_entity_1 = require("./Type.entity");
let ProductEntity = class ProductEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, detailImage: { required: true, type: () => [require("./Media.entity").MediaEntity] }, coverImage: { required: true, type: () => require("./Media.entity").MediaEntity }, productLogo: { required: true, type: () => require("./Media.entity").MediaEntity }, name: { required: true, type: () => String }, slug: { required: true, type: () => String }, description: { required: true, type: () => String }, isFree: { required: true, type: () => Boolean }, price: { required: true, type: () => Number }, discount: { required: true, type: () => Number }, discountedPrice: { required: true, type: () => Number }, isDiscount: { required: true, type: () => Boolean }, soldCount: { required: true, type: () => Number }, isTopSeller: { required: true, type: () => Boolean }, developer: { required: true, type: () => String }, publisher: { required: true, type: () => String }, isSlider: { required: true, type: () => Boolean }, ageRestriction: { required: true, enum: require("../common/enums/ageRestriction.enum").AgeRestriction }, isPin: { required: true, type: () => Boolean }, events: { required: true, type: () => [require("./Event.entity").EventEntity] }, genres: { required: true, type: () => [require("./Genre.entity").GenreEntity] }, types: { required: true, type: () => [require("./Type.entity").TypeEntity] }, features: { required: true, type: () => [require("./Feature.entity").FeatureEntity] }, platforms: { required: true, type: () => [require("./Platform.entity").PlatformEntity] }, subscriptions: { required: true, type: () => [require("./Subscription.entity").SubscriptionEntity] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.ProductEntity = ProductEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Media_entity_1.MediaEntity),
    (0, typeorm_1.JoinTable)({ name: 'product_detailImage' }),
    __metadata("design:type", Array)
], ProductEntity.prototype, "detailImage", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Media_entity_1.MediaEntity, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'coverImageId' }),
    __metadata("design:type", Media_entity_1.MediaEntity)
], ProductEntity.prototype, "coverImage", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Media_entity_1.MediaEntity),
    (0, typeorm_1.JoinColumn)({ name: 'productLogoId' }),
    __metadata("design:type", Media_entity_1.MediaEntity)
], ProductEntity.prototype, "productLogo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ProductEntity.prototype, "isFree", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "discountedPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ProductEntity.prototype, "isDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "soldCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ProductEntity.prototype, "isTopSeller", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "developer", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "publisher", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ProductEntity.prototype, "isSlider", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ageRestriction_enum_1.AgeRestriction, default: ageRestriction_enum_1.AgeRestriction.Age3 }),
    __metadata("design:type", String)
], ProductEntity.prototype, "ageRestriction", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ProductEntity.prototype, "isPin", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Event_entity_1.EventEntity, { cascade: true }),
    (0, typeorm_1.JoinTable)({ name: 'product_event' }),
    __metadata("design:type", Array)
], ProductEntity.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Genre_entity_1.GenreEntity, { cascade: true }),
    (0, typeorm_1.JoinTable)({ name: 'product_genre' }),
    __metadata("design:type", Array)
], ProductEntity.prototype, "genres", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Type_entity_1.TypeEntity, { cascade: true }),
    (0, typeorm_1.JoinTable)({ name: 'product_type' }),
    __metadata("design:type", Array)
], ProductEntity.prototype, "types", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Feature_entity_1.FeatureEntity, { cascade: true }),
    (0, typeorm_1.JoinTable)({ name: 'product_feature' }),
    __metadata("design:type", Array)
], ProductEntity.prototype, "features", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Platform_entity_1.PlatformEntity, { cascade: true }),
    (0, typeorm_1.JoinTable)({ name: 'product_platform' }),
    __metadata("design:type", Array)
], ProductEntity.prototype, "platforms", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Subscription_entity_1.SubscriptionEntity, { cascade: true }),
    (0, typeorm_1.JoinTable)({ name: 'product_subscription' }),
    __metadata("design:type", Array)
], ProductEntity.prototype, "subscriptions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProductEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProductEntity.prototype, "updatedAt", void 0);
exports.ProductEntity = ProductEntity = __decorate([
    (0, typeorm_1.Entity)('product')
], ProductEntity);
//# sourceMappingURL=Product.entity.js.map