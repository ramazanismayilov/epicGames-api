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
exports.TypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const typeorm_2 = require("typeorm");
const role_enum_1 = require("../../common/enums/role.enum");
const Type_entity_1 = require("../../entities/Type.entity");
let TypeService = class TypeService {
    constructor(cls, dataSource) {
        this.cls = cls;
        this.dataSource = dataSource;
        this.typeRepo = this.dataSource.getRepository(Type_entity_1.TypeEntity);
    }
    async getAllTypes() {
        const types = await this.typeRepo.find();
        if (types.length === 0)
            throw new common_1.NotFoundException('Types not found');
        return types;
    }
    async addType(params) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to add type');
        let type = this.typeRepo.create(params);
        await this.typeRepo.save(type);
        return { message: "Type created successfully", type };
    }
    async updateType(typeId, params) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to update type');
        const type = await this.typeRepo.findOne({ where: { id: typeId } });
        if (!type)
            throw new common_1.NotFoundException({ message: 'Type not found' });
        if (params.name)
            type.name = params.name;
        await this.typeRepo.save(type);
        return { message: 'Type updated successfully', type };
    }
    async deleteType(typeId) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to delete type');
        let type = await this.typeRepo.findOne({ where: { id: typeId } });
        if (!type)
            throw new common_1.NotFoundException('Type not found');
        await this.typeRepo.delete(typeId);
        return { message: 'Type deleted successfully' };
    }
};
exports.TypeService = TypeService;
exports.TypeService = TypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService,
        typeorm_2.DataSource])
], TypeService);
//# sourceMappingURL=type.service.js.map