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
exports.GetProductsDto = exports.UpdateProductDto = exports.AddProductDto = exports.ProductDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const ageRestriction_enum_1 = require("../../../common/enums/ageRestriction.enum");
class ProductDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { detailImageId: { required: true, type: () => [String], format: "uuid" }, coverImageId: { required: true, type: () => String, format: "uuid" }, productLogoId: { required: true, type: () => String, format: "uuid" }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, isFree: { required: true, type: () => Boolean }, price: { required: true, type: () => Number, minimum: 0 }, discount: { required: true, type: () => Number, minimum: 0 }, developer: { required: true, type: () => String }, isSilder: { required: true, type: () => Boolean }, isPin: { required: true, type: () => Boolean }, publisher: { required: true, type: () => String }, ageRestriction: { required: true, enum: require("../../../common/enums/ageRestriction.enum").AgeRestriction }, eventsId: { required: true, type: () => [Number] }, genresId: { required: true, type: () => [Number] }, typesId: { required: true, type: () => [Number] }, featuresId: { required: true, type: () => [Number] }, platformsId: { required: true, type: () => [Number] }, subscriptionsId: { required: true, type: () => [Number] } };
    }
}
exports.ProductDto = ProductDto;
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    __metadata("design:type", Array)
], ProductDto.prototype, "detailImageId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], ProductDto.prototype, "coverImageId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], ProductDto.prototype, "productLogoId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ProductDto.prototype, "isFree", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductDto.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductDto.prototype, "discount", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDto.prototype, "developer", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ProductDto.prototype, "isSilder", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ProductDto.prototype, "isPin", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDto.prototype, "publisher", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(ageRestriction_enum_1.AgeRestriction),
    __metadata("design:type", String)
], ProductDto.prototype, "ageRestriction", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], ProductDto.prototype, "eventsId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], ProductDto.prototype, "genresId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], ProductDto.prototype, "typesId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], ProductDto.prototype, "featuresId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], ProductDto.prototype, "platformsId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], ProductDto.prototype, "subscriptionsId", void 0);
class AddProductDto extends ProductDto {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.AddProductDto = AddProductDto;
class UpdateProductDto extends (0, swagger_1.PartialType)(ProductDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateProductDto = UpdateProductDto;
class GetProductsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { limit: { required: false, type: () => Number, minimum: 1 }, page: { required: false, type: () => Number, minimum: 1 }, search: { required: false, type: () => String }, isDiscount: { required: false, type: () => Boolean }, isFree: { required: false, type: () => Boolean }, isTopSeller: { required: false, type: () => Boolean }, sortBy: { required: false, type: () => Object }, order: { required: false, type: () => Object }, eventId: { required: false, type: () => [Number] }, genreId: { required: false, type: () => [Number] }, typeId: { required: false, type: () => [Number] }, featureId: { required: false, type: () => [Number] }, platformId: { required: false, type: () => [Number] }, subscriptionId: { required: false, type: () => [Number] } };
    }
}
exports.GetProductsDto = GetProductsDto;
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], GetProductsDto.prototype, "limit", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetProductsDto.prototype, "page", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetProductsDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true'),
    __metadata("design:type", Boolean)
], GetProductsDto.prototype, "isDiscount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true'),
    __metadata("design:type", Boolean)
], GetProductsDto.prototype, "isFree", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true'),
    __metadata("design:type", Boolean)
], GetProductsDto.prototype, "isTopSeller", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: ['createdAt', 'price', 'name'],
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetProductsDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: ['ASC', 'DESC'],
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetProductsDto.prototype, "order", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Transform)(({ value }) => (Array.isArray(value) ? value.map(Number) : [Number(value)])),
    __metadata("design:type", Array)
], GetProductsDto.prototype, "eventId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Transform)(({ value }) => (Array.isArray(value) ? value.map(Number) : [Number(value)])),
    __metadata("design:type", Array)
], GetProductsDto.prototype, "genreId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Transform)(({ value }) => (Array.isArray(value) ? value.map(Number) : [Number(value)])),
    __metadata("design:type", Array)
], GetProductsDto.prototype, "typeId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Transform)(({ value }) => (Array.isArray(value) ? value.map(Number) : [Number(value)])),
    __metadata("design:type", Array)
], GetProductsDto.prototype, "featureId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Transform)(({ value }) => (Array.isArray(value) ? value.map(Number) : [Number(value)])),
    __metadata("design:type", Array)
], GetProductsDto.prototype, "platformId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Transform)(({ value }) => (Array.isArray(value) ? value.map(Number) : [Number(value)])),
    __metadata("design:type", Array)
], GetProductsDto.prototype, "subscriptionId", void 0);
//# sourceMappingURL=product.dto.js.map