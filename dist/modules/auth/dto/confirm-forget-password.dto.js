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
exports.ConfirmForgetPaswordDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ConfirmForgetPaswordDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { token: { required: true, type: () => String, format: "uuid" }, newPassword: { required: true, type: () => String, minLength: 6, maxLength: 12 }, repeatPassword: { required: true, type: () => String, minLength: 6, maxLength: 12 } };
    }
}
exports.ConfirmForgetPaswordDto = ConfirmForgetPaswordDto;
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ConfirmForgetPaswordDto.prototype, "token", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6, 12),
    __metadata("design:type", String)
], ConfirmForgetPaswordDto.prototype, "newPassword", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6, 12),
    __metadata("design:type", String)
], ConfirmForgetPaswordDto.prototype, "repeatPassword", void 0);
//# sourceMappingURL=confirm-forget-password.dto.js.map