"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = require("./admin");
const role_1 = require("./role");
async function bootstrap() {
    await (0, admin_1.seedAdmin)();
    await (0, role_1.seedRoles)();
}
bootstrap().then(() => {
    console.log('Seeding finished');
    process.exit(0);
}).catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map