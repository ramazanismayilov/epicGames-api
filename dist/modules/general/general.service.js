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
exports.GeneralService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Role_entity_1 = require("../../entities/Role.entity");
const typeorm_2 = require("typeorm");
const Menu_entity_1 = require("../../entities/Menu.entity");
const nestjs_cls_1 = require("nestjs-cls");
const role_enum_1 = require("../../common/enums/role.enum");
let GeneralService = class GeneralService {
    constructor(cls, dataSource) {
        this.cls = cls;
        this.dataSource = dataSource;
        this.roleRepo = this.dataSource.getRepository(Role_entity_1.RoleEntity);
        this.menuRepo = this.dataSource.getRepository(Menu_entity_1.MenuEntity);
    }
    async getRoles() {
        const currentUser = this.cls.get('user');
        if (currentUser.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission for this operation');
        let roles = await this.roleRepo.find();
        if (!roles.length)
            throw new common_1.NotFoundException('Role not found');
        return roles;
    }
    async getMenus() {
        const user = this.cls.get('user');
        const roleId = user.role.id;
        const menus = await this.menuRepo.find({
            where: {
                roles: {
                    id: roleId,
                },
            },
        });
        if (!menus.length)
            throw new common_1.NotFoundException('Menu not found');
        return menus;
    }
    async addMenu(params) {
        const currentUser = this.cls.get('user');
        if (currentUser.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission for this operation');
        const roles = params.roles.map(id => ({ id }));
        const foundRoles = await this.roleRepo.findBy({ id: (0, typeorm_2.In)(params.roles) });
        if (foundRoles.length !== params.roles.length)
            throw new common_1.NotFoundException('One or more roles not found');
        let menu = this.menuRepo.create({ ...params, roles });
        const savedMenu = await this.menuRepo.save(menu);
        const menuWithRelations = await this.menuRepo.findOne({ where: { id: savedMenu.id }, relations: ['roles'] });
        return { message: 'Menu created successfully', data: menuWithRelations };
    }
};
exports.GeneralService = GeneralService;
exports.GeneralService = GeneralService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService,
        typeorm_2.DataSource])
], GeneralService);
//# sourceMappingURL=general.service.js.map