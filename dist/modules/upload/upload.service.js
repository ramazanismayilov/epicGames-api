"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const nestjs_cls_1 = require("nestjs-cls");
const media_enum_1 = require("../../common/enums/media.enum");
const role_enum_1 = require("../../common/enums/role.enum");
const Media_entity_1 = require("../../entities/Media.entity");
const cloudinary_service_1 = require("../../libs/cloudinary/cloudinary.service");
const typeorm_2 = require("typeorm");
let UploadService = class UploadService {
    constructor(cloudinaryService, cls, dataSoruce) {
        this.cloudinaryService = cloudinaryService;
        this.cls = cls;
        this.dataSoruce = dataSoruce;
        this.mediaRepo = this.dataSoruce.getRepository(Media_entity_1.MediaEntity);
    }
    async getMedias() {
        const medias = await this.mediaRepo.find({ order: { id: 'ASC' }, select: { id: true, url: true, type: true, createdAt: true, updatedAt: true } });
        if (medias.length === 0)
            throw new common_1.NotFoundException('Medias not found');
        return medias;
    }
    async uploadMedias(files) {
        let user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to upload');
        try {
            const uploadedMedias = [];
            for (const file of files) {
                const result = await this.cloudinaryService.uploadFile(file);
                if (!result?.url)
                    continue;
                const isVideo = file.mimetype.startsWith('video/');
                const mediaType = isVideo ? media_enum_1.Media.VIDEO : media_enum_1.Media.IMAGE;
                const media = this.mediaRepo.create({ url: result.url, type: mediaType });
                await media.save();
                uploadedMedias.push(media);
            }
            if (!uploadedMedias.length)
                throw new common_1.BadRequestException('No medias were uploaded successfully');
            return uploadedMedias;
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException('Something went wrong');
        }
    }
    async deletemedia(id) {
        let user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to upload');
        if (!(0, class_validator_1.isUUID)(id))
            throw new common_1.BadRequestException('Media id type is wrong');
        const media = await this.mediaRepo.findOne({ where: { id } });
        if (!media)
            throw new common_1.NotFoundException('Media not found');
        await this.mediaRepo.remove(media);
        return { message: "Media deleted successfully" };
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService,
        nestjs_cls_1.ClsService,
        typeorm_2.DataSource])
], UploadService);
//# sourceMappingURL=upload.service.js.map