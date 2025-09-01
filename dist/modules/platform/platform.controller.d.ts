import { PlatformService } from "./platform.service";
import { AddPlatformDto, UpdatePlatformDto } from "./dto/platform.dto";
export declare class PlatformController {
    private platformService;
    constructor(platformService: PlatformService);
    getAllPlatforms(): Promise<import("../../entities/Platform.entity").PlatformEntity[]>;
    addPlatform(body: AddPlatformDto): Promise<{
        message: string;
        platform: import("../../entities/Platform.entity").PlatformEntity;
    }>;
    updatePlatform(id: number, body: UpdatePlatformDto): Promise<{
        message: string;
        platform: import("../../entities/Platform.entity").PlatformEntity;
    }>;
    deletePlatform(id: number): Promise<{
        message: string;
    }>;
}
