import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { CloudinaryModule } from "src/libs/cloudinary/cloudinary.module";

@Module({
    imports: [CloudinaryModule],
    controllers: [UploadController],
    providers: [UploadService]
})
export class UploadModule { }