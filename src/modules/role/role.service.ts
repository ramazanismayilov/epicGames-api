import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { RoleEntity } from "src/entities/Role.entity";
import { DataSource, Repository } from "typeorm";
import { RoleCreateDto } from "./dto/addRole.dto";

@Injectable()
export class RoleService {
    private roleRepo: Repository<RoleEntity>

    constructor(
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.roleRepo = this.dataSource.getRepository(RoleEntity)
    }

    async getRoles() {
        let roles = await this.roleRepo.find();
        if (!roles.length) throw new NotFoundException('Role not found')
        return roles
    }

    async getRole(roleId: number) {
        let role = await this.roleRepo.findOne({ where: { id: roleId } });
        if (!role) throw new NotFoundException('Role not found')
        return role
    }

    async addRole(params: RoleCreateDto) {
        let role = this.roleRepo.create(params)
        await this.roleRepo.save(role)
        return { message: 'Role created successfully', role }
    }

    async deleteRole(roleId: number) {
        let role = await this.roleRepo.findOne({ where: { id: roleId } })
        if (!role) throw new NotFoundException('Role not found')

        await this.roleRepo.delete(roleId)
        return { message: 'Role deleted successfully' }
    }
}