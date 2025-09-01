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
exports.GeneralController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
const general_service_1 = require("./general.service");
const addMenu_dto_1 = require("./dto/addMenu.dto");
let GeneralController = class GeneralController {
    constructor(generalService) {
        this.generalService = generalService;
    }
    getRoles() {
        return this.generalService.getRoles();
    }
    getMenus() {
        return this.generalService.getMenus();
    }
    addMenu(body) {
        return this.generalService.addMenu(body);
    }
};
exports.GeneralController = GeneralController;
__decorate([
    (0, common_1.Get)('roles'),
    openapi.ApiResponse({ status: 200, type: [require("../../entities/Role.entity").RoleEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GeneralController.prototype, "getRoles", null);
__decorate([
    (0, common_1.Get)('menus'),
    openapi.ApiResponse({ status: 200, type: [require("../../entities/Menu.entity").MenuEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GeneralController.prototype, "getMenus", null);
__decorate([
    (0, common_1.Post)('menus'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addMenu_dto_1.MenuCreateDto]),
    __metadata("design:returntype", void 0)
], GeneralController.prototype, "addMenu", null);
exports.GeneralController = GeneralController = __decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Controller)('general'),
    __metadata("design:paramtypes", [general_service_1.GeneralService])
], GeneralController);
//# sourceMappingURL=general.controller.js.map