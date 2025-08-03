import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { ClsService } from "nestjs-cls";
import { Media } from "../../common/enums/media.enum";
import { Role } from "../../common/enums/role.enum";
import { MediaEntity } from "../../entities/Media.entity";
import { UserEntity } from "../../entities/User.entity";
import { CloudinaryService } from "../../libs/cloudinary/cloudinary.service";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UploadService {
    private mediaRepo: Repository<MediaEntity>;

    constructor(
        private cloudinaryService: CloudinaryService,
        private cls: ClsService,
        @InjectDataSource() private dataSoruce: DataSource,
    ) {
        this.mediaRepo = this.dataSoruce.getRepository(MediaEntity);
    }

    async getMedias() {
        const medias = await this.mediaRepo.find({ order: { id: 'ASC' }, select: { id: true, url: true, type: true, createdAt: true, updatedAt: true } })
        if (medias.length === 0) throw new NotFoundException('Medias not found');

        return medias
    }

    async uploadMedias(files: Express.Multer.File[]) {
        let user = this.cls.get<UserEntity>('user');
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to upload');

        try {
            const uploadedMedias: MediaEntity[] = [];

            for (const file of files) {
                const result = await this.cloudinaryService.uploadFile(file);
                if (!result?.url) continue;

                const isVideo = file.mimetype.startsWith('video/');
                const mediaType = isVideo ? Media.VIDEO : Media.IMAGE;

                const media = this.mediaRepo.create({ url: result.url, type: mediaType });
                await media.save();
                uploadedMedias.push(media);
            }

            if (!uploadedMedias.length) throw new BadRequestException('No medias were uploaded successfully');

            return uploadedMedias;
        } catch (err) {
            console.log(err);
            throw new BadRequestException('Something went wrong');
        }
    }

    async deletemedia(id: string) {
        let user = this.cls.get<UserEntity>('user')
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to upload')
        if (!isUUID(id)) throw new BadRequestException('Media id type is wrong');

        const media = await this.mediaRepo.findOne({ where: { id } });
        if (!media) throw new NotFoundException('Media not found');

        await this.mediaRepo.remove(media);
        return { message: "Media deleted successfully" };
    }
}