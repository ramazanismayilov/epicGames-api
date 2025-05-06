import { Injectable } from '@nestjs/common';
import { Role } from './common/enums/role.enum';
import { DataSource, Repository } from 'typeorm';
import { RoleEntity } from './entities/Role.entity';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class AppService {
    private roleRepo: Repository<RoleEntity>

    constructor(
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.roleRepo = this.dataSource.getRepository(RoleEntity)
    }

    onApplicationBootstrap() {
        this.seedRoles();
    }

    async seedRoles() {
        const roles = [Role.ADMIN, Role.USER];

        for (const name of roles) {
            const exists = await this.roleRepo.findOne({ where: { name } });
            if (!exists) {
                const role = this.roleRepo.create({ name });
                await this.roleRepo.save(role);
            }
        }
    }

}
