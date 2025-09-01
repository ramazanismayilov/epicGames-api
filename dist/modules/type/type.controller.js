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
exports.TypeController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
const type_service_1 = require("./type.service");
const type_dto_1 = require("./dto/type.dto");
let TypeController = class TypeController {
    constructor(typeService) {
        this.typeService = typeService;
    }
    getAllTypes() {
        return this.typeService.getAllTypes();
    }
    addType(body) {
        return this.typeService.addType(body);
    }
    updateType(id, body) {
        return this.typeService.updateType(id, body);
    }
    deleteType(id) {
        return this.typeService.deleteType(id);
    }
};
exports.TypeController = TypeController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../../entities/Type.entity").TypeEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TypeController.prototype, "getAllTypes", null);
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_dto_1.AddTypeDto]),
    __metadata("design:returntype", void 0)
], TypeController.prototype, "addType", null);
__decorate([
    (0, common_1.Post)(':id'),
    (0, auth_decorator_1.Auth)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, type_dto_1.UpdateTypeDto]),
    __metadata("design:returntype", void 0)
], TypeController.prototype, "updateType", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TypeController.prototype, "deleteType", null);
exports.TypeController = TypeController = __decorate([
    (0, common_1.Controller)('types'),
    __metadata("design:paramtypes", [type_service_1.TypeService])
], TypeController);
//# sourceMappingURL=type.controller.js.map