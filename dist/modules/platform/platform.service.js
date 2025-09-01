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
exports.PlatformService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const typeorm_2 = require("typeorm");
const role_enum_1 = require("../../common/enums/role.enum");
const Platform_entity_1 = require("../../entities/Platform.entity");
let PlatformService = class PlatformService {
    constructor(cls, dataSource) {
        this.cls = cls;
        this.dataSource = dataSource;
        this.platformRepo = this.dataSource.getRepository(Platform_entity_1.PlatformEntity);
    }
    async getAllPlatforms() {
        const platforms = await this.platformRepo.find();
        if (platforms.length === 0)
            throw new common_1.NotFoundException('Platforms not found');
        return platforms;
    }
    async addPlatform(params) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to add platform');
        let platform = this.platformRepo.create(params);
        await this.platformRepo.save(platform);
        return { message: "Platform created successfully", platform };
    }
    async updatePlatform(platformId, params) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to update platform');
        const platform = await this.platformRepo.findOne({ where: { id: platformId } });
        if (!platform)
            throw new common_1.NotFoundException({ message: 'Platform not found' });
        if (params.name)
            platform.name = params.name;
        await this.platformRepo.save(platform);
        return { message: 'Platform updated successfully', platform };
    }
    async deletePlatform(platformId) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to delete platform');
        let platform = await this.platformRepo.findOne({ where: { id: platformId } });
        if (!platform)
            throw new common_1.NotFoundException('Platform not found');
        await this.platformRepo.delete(platformId);
        return { message: 'Platform deleted successfully' };
    }
};
exports.PlatformService = PlatformService;
exports.PlatformService = PlatformService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService,
        typeorm_2.DataSource])
], PlatformService);
//# sourceMappingURL=platform.service.js.map