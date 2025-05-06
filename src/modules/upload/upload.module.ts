import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { CloudinaryModule } from "../../libs/cloudinary/cloudinary.module";

@Module({
    imports: [CloudinaryModule],
    controllers: [UploadController],
    providers: [UploadService]
})
export class UploadModule { }