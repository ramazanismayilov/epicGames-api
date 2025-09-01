import { ConfigService } from "@nestjs/config";
export declare class CloudinaryService {
    private configService;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File): Promise<{
        url: any;
        type: string;
    }>;
}
