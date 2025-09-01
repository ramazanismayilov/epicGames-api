"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = seedAdmin;
const core_1 = require("@nestjs/core");
const bcrypt = __importStar(require("bcrypt"));
const User_entity_1 = require("../entities/User.entity");
const uuid_1 = require("uuid");
const Role_entity_1 = require("../entities/Role.entity");
const typeorm_1 = require("typeorm");
const app_module_1 = require("../app.module");
const role_enum_1 = require("../common/enums/role.enum");
const provider_enum_1 = require("../common/enums/provider.enum");
async function seedAdmin() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const dataSource = app.get(typeorm_1.DataSource);
    const userRepo = dataSource.getRepository(User_entity_1.UserEntity);
    const roleRepo = dataSource.getRepository(Role_entity_1.RoleEntity);
    let adminRole = await roleRepo.findOne({ where: { name: role_enum_1.Role.ADMIN } });
    if (!adminRole) {
        adminRole = roleRepo.create({ name: role_enum_1.Role.ADMIN });
        await roleRepo.save(adminRole);
    }
    const adminEmail = 'ramazanismayilovh@gmail.com';
    const existingAdmin = await userRepo.findOne({ where: { email: adminEmail } });
    if (!existingAdmin) {
        const password = await bcrypt.hash('admin123', 10);
        const adminUser = userRepo.create({
            firstname: 'Admin',
            lastname: 'Adminov',
            username: 'admin',
            email: adminEmail,
            password,
            dateOfBirth: '2005-10-22',
            country: 'Azerbaijan',
            accountId: (0, uuid_1.v4)(),
            isVerified: true,
            role: adminRole,
            provider: provider_enum_1.Provider.LOCAL
        });
        await userRepo.save(adminUser);
    }
    await app.close();
}
//# sourceMappingURL=admin.js.map