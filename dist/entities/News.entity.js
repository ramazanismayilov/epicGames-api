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
exports.NewsEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const Media_entity_1 = require("./Media.entity");
let NewsEntity = class NewsEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, media: { required: true, type: () => require("./Media.entity").MediaEntity }, title: { required: true, type: () => String }, description: { required: true, type: () => String }, order: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.NewsEntity = NewsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NewsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Media_entity_1.MediaEntity, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({
        name: 'mediaId',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", Media_entity_1.MediaEntity)
], NewsEntity.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NewsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NewsEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], NewsEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], NewsEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], NewsEntity.prototype, "updatedAt", void 0);
exports.NewsEntity = NewsEntity = __decorate([
    (0, typeorm_1.Entity)('news')
], NewsEntity);
//# sourceMappingURL=News.entity.js.map