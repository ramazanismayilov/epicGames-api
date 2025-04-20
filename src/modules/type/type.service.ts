import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "src/entities/User.entity";
import { Role } from "src/common/enums/role.enum";
import { TypeEntity } from "src/entities/Type.entity";
import { AddTypeDto, UpdateTypeDto } from "./dto/type.dto";

@Injectable()
export class TypeService {
    private typeRepo: Repository<TypeEntity>

    constructor(
        private cls: ClsService,
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.typeRepo = this.dataSource.getRepository(TypeEntity)
    }

    async getAllTypes() {
        const types = await this.typeRepo.find();
        if (types.length === 0) throw new NotFoundException('Types not found');

        return types;
    }

    async addType(params: AddTypeDto) {
        const user = this.cls.get<UserEntity>('user')
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to add type')

        let type = this.typeRepo.create(params)
        await this.typeRepo.save(type)
        return { message: "Type created successfully", type }
    }

    async updateType(typeId: number, params: UpdateTypeDto) {
        const user = this.cls.get<UserEntity>('user')
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to update type')

        const type = await this.typeRepo.findOne({ where: { id: typeId } });
        if (!type) throw new NotFoundException({ message: 'Type not found' });

        if (params.name) type.name = params.name
        await this.typeRepo.save(type);
        return { message: 'Type updated successfully', type };
    }

    async deleteType(typeId: number) {
        const user = this.cls.get<UserEntity>('user')
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to delete type')

        let type = await this.typeRepo.findOne({ where: { id: typeId } })
        if (!type) throw new NotFoundException('Type not found')

        await this.typeRepo.delete(typeId)
        return { message: 'Type deleted successfully' }
    }
}
