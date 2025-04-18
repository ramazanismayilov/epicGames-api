import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { ClsService } from "nestjs-cls";
import { Role } from "src/common/enums/role.enum";
import { ImageEntity } from "src/entities/Image.entity";
import { UserEntity } from "src/entities/User.entity";
import { CloudinaryService } from "src/libs/cloudinary/cloudinary.service";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UploadService {
    private imageRepo: Repository<ImageEntity>;

    constructor(
        private cloudinaryService: CloudinaryService,
        private cls: ClsService,
        @InjectDataSource() private dataSoruce: DataSource,
    ) {
        this.imageRepo = this.dataSoruce.getRepository(ImageEntity);
    }

    async allImages() {
        const images = await this.imageRepo.find({ order: { id: 'ASC' } })
        if (images.length === 0) throw new NotFoundException('Images not found');

        return images
    }

    async uploadImages(files: Express.Multer.File[]) {
        let user = this.cls.get<UserEntity>('user');
        if (user.role.name !== Role.ADMIN) {
            throw new ForbiddenException('You do not have permission to upload');
        }

        try {
            const uploadedImages: ImageEntity[] = [];

            for (const file of files) {
                const result = await this.cloudinaryService.uploadFile(file);
                if (!result?.url) continue;

                const image = this.imageRepo.create({ url: result.url });
                await image.save();
                uploadedImages.push(image);
            }

            if (!uploadedImages.length) {
                throw new BadRequestException('No images were uploaded successfully');
            }

            return uploadedImages;
        } catch (err) {
            throw new BadRequestException('Something went wrong');
        }
    }

    async deleteImage(id: string) {
        let user = this.cls.get<UserEntity>('user')
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to upload')
        if (!isUUID(id)) throw new BadRequestException('Image id type is wrong');

        const image = await this.imageRepo.findOne({ where: { id } });
        if (!image) throw new NotFoundException('Image not found');

        await this.imageRepo.remove(image);
        return { message: "Image deleted successfully" };
    }
}