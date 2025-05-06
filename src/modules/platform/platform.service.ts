import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../../entities/User.entity";
import { Role } from "../../common/enums/role.enum";
import { PlatformEntity } from "../../entities/Platform.entity";
import { AddPlatformDto, UpdatePlatformDto } from "./dto/platform.dto";

@Injectable()
export class PlatformService {
    private platformRepo: Repository<PlatformEntity>

    constructor(
        private cls: ClsService,
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.platformRepo = this.dataSource.getRepository(PlatformEntity)
    }

    async getAllPlatforms() {
        const platforms = await this.platformRepo.find();
        if (platforms.length === 0) throw new NotFoundException('Platforms not found');

        return platforms;
    }

    async addPlatform(params: AddPlatformDto) {
        const user = this.cls.get<UserEntity>('user')
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to add platform')

        let platform = this.platformRepo.create(params)
        await this.platformRepo.save(platform)
        return { message: "Platform created successfully", platform }
    }

    async updatePlatform(platformId: number, params: UpdatePlatformDto) {
        const user = this.cls.get<UserEntity>('user')
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to update platform')

        const platform = await this.platformRepo.findOne({ where: { id: platformId } });
        if (!platform) throw new NotFoundException({ message: 'Platform not found' });

        if (params.name) platform.name = params.name
        await this.platformRepo.save(platform);
        return { message: 'Platform updated successfully', platform };
    }

    async deletePlatform(platformId: number) {
        const user = this.cls.get<UserEntity>('user')
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to delete platform')

        let platform = await this.platformRepo.findOne({ where: { id: platformId } })
        if (!platform) throw new NotFoundException('Platform not found')

        await this.platformRepo.delete(platformId)
        return { message: 'Platform deleted successfully' }
    }
}
