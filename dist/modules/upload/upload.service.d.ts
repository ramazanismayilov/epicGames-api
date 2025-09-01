import { ClsService } from "nestjs-cls";
import { MediaEntity } from "../../entities/Media.entity";
import { CloudinaryService } from "../../libs/cloudinary/cloudinary.service";
import { DataSource } from "typeorm";
export declare class UploadService {
    private cloudinaryService;
    private cls;
    private dataSoruce;
    private mediaRepo;
    constructor(cloudinaryService: CloudinaryService, cls: ClsService, dataSoruce: DataSource);
    getMedias(): Promise<MediaEntity[]>;
    uploadMedias(files: Express.Multer.File[]): Promise<MediaEntity[]>;
    deletemedia(id: string): Promise<{
        message: string;
    }>;
}
