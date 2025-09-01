import { UploadService } from "./upload.service";
export declare class UploadController {
    private uploadService;
    constructor(uploadService: UploadService);
    getMedias(): Promise<import("../../entities/Media.entity").MediaEntity[]>;
    uploadMedias(files: Express.Multer.File[]): Promise<import("../../entities/Media.entity").MediaEntity[]>;
    deletemedia(id: string): Promise<{
        message: string;
    }>;
}
