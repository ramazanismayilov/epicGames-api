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
exports.FeatureService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const Feature_entity_1 = require("../../entities/Feature.entity");
const typeorm_2 = require("typeorm");
const role_enum_1 = require("../../common/enums/role.enum");
let FeatureService = class FeatureService {
    constructor(cls, dataSource) {
        this.cls = cls;
        this.dataSource = dataSource;
        this.featureRepo = this.dataSource.getRepository(Feature_entity_1.FeatureEntity);
    }
    async getAllFeatures() {
        const features = await this.featureRepo.find();
        if (features.length === 0)
            throw new common_1.NotFoundException('Features not found');
        return features;
    }
    async addFeature(params) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to add feature');
        const feature = this.featureRepo.create(params);
        await this.featureRepo.save(feature);
        return { message: "Feature created successfully", feature };
    }
    async updateFeature(featureId, params) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to update feature');
        const feature = await this.featureRepo.findOne({ where: { id: featureId } });
        if (!feature)
            throw new common_1.NotFoundException({ message: 'Feature not found' });
        if (params.name)
            feature.name = params.name;
        await this.featureRepo.save(feature);
        return { message: 'Feature updated successfully', feature };
    }
    async deleteFeature(featureId) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to delete feature');
        const feature = await this.featureRepo.findOne({ where: { id: featureId } });
        if (!feature)
            throw new common_1.NotFoundException('Feature not found');
        await this.featureRepo.delete(featureId);
        return { message: 'Feature deleted successfully' };
    }
};
exports.FeatureService = FeatureService;
exports.FeatureService = FeatureService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService,
        typeorm_2.DataSource])
], FeatureService);
//# sourceMappingURL=feature.service.js.map