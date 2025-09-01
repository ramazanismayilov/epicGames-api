"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRoles = seedRoles;
const core_1 = require("@nestjs/core");
const Role_entity_1 = require("../entities/Role.entity");
const typeorm_1 = require("typeorm");
const app_module_1 = require("../app.module");
const role_enum_1 = require("../common/enums/role.enum");
async function seedRoles() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const dataSource = app.get(typeorm_1.DataSource);
    const roleRepo = dataSource.getRepository(Role_entity_1.RoleEntity);
    const roles = [role_enum_1.Role.ADMIN, role_enum_1.Role.USER];
    for (const name of roles) {
        const existsRole = await roleRepo.findOne({ where: { name } });
        if (!existsRole) {
            const role = roleRepo.create({ name });
            await roleRepo.save(role);
        }
    }
    await app.close();
}
//# sourceMappingURL=role.js.map