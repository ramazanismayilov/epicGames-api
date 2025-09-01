import { ClsService } from "nestjs-cls";
import { DataSource } from "typeorm";
import { PlatformEntity } from "../../entities/Platform.entity";
import { AddPlatformDto, UpdatePlatformDto } from "./dto/platform.dto";
export declare class PlatformService {
    private cls;
    private dataSource;
    private platformRepo;
    constructor(cls: ClsService, dataSource: DataSource);
    getAllPlatforms(): Promise<PlatformEntity[]>;
    addPlatform(params: AddPlatformDto): Promise<{
        message: string;
        platform: PlatformEntity;
    }>;
    updatePlatform(platformId: number, params: UpdatePlatformDto): Promise<{
        message: string;
        platform: PlatformEntity;
    }>;
    deletePlatform(platformId: number): Promise<{
        message: string;
    }>;
}
