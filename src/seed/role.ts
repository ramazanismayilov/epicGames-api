import { NestFactory } from '@nestjs/core';
import { RoleEntity } from '../entities/Role.entity';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module';
import { Role } from '../common/enums/role.enum';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const dataSource = app.get(DataSource);
    const roleRepo = dataSource.getRepository(RoleEntity); 

    const roles = [Role.ADMIN, Role.USER];

    for (const name of roles) {
        const existsRole = await roleRepo.findOne({ where: { name } });
        if (!existsRole) {
            const role = roleRepo.create({ name });
            await roleRepo.save(role);
        }
    }

    await app.close();
}
bootstrap();
