"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEntitiesByIds = findEntitiesByIds;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
async function findEntitiesByIds(repo, ids, entityName) {
    const entities = await repo.findBy({ id: (0, typeorm_1.In)(ids) });
    if (entities.length !== ids.length)
        throw new common_1.NotFoundException(`Some ${entityName} not found`);
    return entities;
}
//# sourceMappingURL=findEntitie.utils.js.map