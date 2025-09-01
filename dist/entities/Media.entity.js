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
exports.MediaEntity = void 0;
const openapi = require("@nestjs/swagger");
const media_enum_1 = require("../common/enums/media.enum");
const typeorm_1 = require("typeorm");
let MediaEntity = class MediaEntity extends typeorm_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, url: { required: true, type: () => String }, type: { required: true, enum: require("../common/enums/media.enum").Media }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.MediaEntity = MediaEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MediaEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MediaEntity.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: media_enum_1.Media, default: media_enum_1.Media.IMAGE }),
    __metadata("design:type", String)
], MediaEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], MediaEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], MediaEntity.prototype, "updatedAt", void 0);
exports.MediaEntity = MediaEntity = __decorate([
    (0, typeorm_1.Entity)('media')
], MediaEntity);
//# sourceMappingURL=Media.entity.js.map