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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("./common/enums/role.enum");
const typeorm_1 = require("typeorm");
const Role_entity_1 = require("./entities/Role.entity");
const typeorm_2 = require("@nestjs/typeorm");
let AppService = class AppService {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.roleRepo = this.dataSource.getRepository(Role_entity_1.RoleEntity);
    }
    onApplicationBootstrap() {
        this.seedRoles();
    }
    async seedRoles() {
        const roles = [role_enum_1.Role.ADMIN, role_enum_1.Role.USER];
        for (const name of roles) {
            const exists = await this.roleRepo.findOne({ where: { name } });
            if (!exists) {
                const role = this.roleRepo.create({ name });
                await this.roleRepo.save(role);
            }
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AppService);
//# sourceMappingURL=app.service.js.map