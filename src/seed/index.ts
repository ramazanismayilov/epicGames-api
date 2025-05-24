import { seedAdmin } from './admin';
import { seedRoles } from './role';

async function bootstrap() {
    await seedAdmin();
    await seedRoles();
}

bootstrap().then(() => {
    console.log('Seeding finished');
    process.exit(0);
}).catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
});
