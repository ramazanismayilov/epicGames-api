import { NestFactory } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entities/User.entity';
import { v4 } from 'uuid';
import { RoleEntity } from '../entities/Role.entity';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module';
import { Role } from '../common/enums/role.enum';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const dataSource = app.get(DataSource);

    const userRepo = dataSource.getRepository(UserEntity);
    const roleRepo = dataSource.getRepository(RoleEntity);

    let adminRole = await roleRepo.findOne({ where: { name: Role.ADMIN } });
    if (!adminRole) {
        adminRole = roleRepo.create({ name: Role.ADMIN });
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
            accountId: v4(),
            isVerified: true,
            role: adminRole
        });
        await userRepo.save(adminUser);
    }
    await app.close();
}
bootstrap();
