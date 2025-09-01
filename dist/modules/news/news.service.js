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
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const role_enum_1 = require("../../common/enums/role.enum");
const News_entity_1 = require("../../entities/News.entity");
const typeorm_2 = require("typeorm");
const Media_entity_1 = require("../../entities/Media.entity");
let NewsService = class NewsService {
    constructor(cls, dataSource) {
        this.cls = cls;
        this.dataSource = dataSource;
        this.newsRepo = this.dataSource.getRepository(News_entity_1.NewsEntity);
        this.mediaRepo = this.dataSource.getRepository(Media_entity_1.MediaEntity);
    }
    async getAllNews(query) {
        const { limit = 10, page = 1, search } = query;
        const offset = (page - 1) * limit;
        const where = {};
        if (search)
            where.title = (0, typeorm_2.ILike)(`%${search}%`);
        const [news, total] = await this.newsRepo.findAndCount({
            where,
            relations: ['media'],
            select: {
                media: {
                    id: true,
                    url: true,
                    type: true,
                },
            },
            order: { order: 'ASC' },
            skip: offset,
            take: limit,
        });
        if (news.length === 0)
            throw new common_1.NotFoundException('News not found');
        return {
            data: news,
            count: total,
            limit,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getNews(newsId) {
        let news = await this.newsRepo.findOne({
            where: { id: newsId },
            relations: ['media'],
            select: {
                media: {
                    id: true,
                    url: true,
                    type: true
                }
            }
        });
        if (!news)
            throw new common_1.NotFoundException('News not found');
        return news;
    }
    async dragAndDrop(newsId, params) {
        const news = await this.newsRepo.findOne({ where: { id: newsId } });
        if (!news)
            throw new common_1.NotFoundException('News not found');
        const conflictingNews = await this.newsRepo.findOne({ where: { order: params.order } });
        if (conflictingNews)
            await this.newsRepo.update(conflictingNews.id, { order: news.order });
        await this.newsRepo.update(newsId, { order: params.order });
        return { message: 'success' };
    }
    async addNews(params) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to add news');
        let existingNews = await this.newsRepo.findOne({ where: { media: { id: params.mediaId } } });
        if (existingNews)
            throw new common_1.ConflictException("This media has already been used in another news entry");
        let media = await this.mediaRepo.findOne({ where: { id: params.mediaId } });
        if (!media)
            throw new common_1.NotFoundException("Media not found");
        let maxOrderResult = await this.newsRepo
            .createQueryBuilder('news')
            .select('MAX(news.order)', 'max')
            .getRawOne();
        let order = (maxOrderResult?.max || 0) + 1;
        let news = this.newsRepo.create({ ...params, media, order });
        await this.newsRepo.save(news);
        return { message: "News created successfully", news };
    }
    async updateNews(newsId, params) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to add news');
        const news = await this.newsRepo.findOne({ where: { id: newsId }, relations: ['media'] });
        if (!news)
            throw new common_1.NotFoundException('News not found');
        if (params.mediaId) {
            const existingNews = await this.newsRepo.findOne({ where: { media: { id: params.mediaId }, id: (0, typeorm_2.Not)(news.id) } });
            if (existingNews)
                throw new common_1.ConflictException('This media is already used in another news entry');
            const media = await this.mediaRepo.findOneBy({ id: params.mediaId });
            if (!media)
                throw new common_1.NotFoundException('Media not found');
            news.media = media;
        }
        if (params.title)
            news.title = params.title;
        if (params.description)
            news.description = params.description;
        await this.newsRepo.save(news);
        return { message: 'News updated successfully', news };
    }
    async deleteNews(newsId) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to delete news');
        let news = await this.newsRepo.findOne({ where: { id: newsId } });
        if (!news)
            throw new common_1.NotFoundException('News not found');
        await this.newsRepo.delete(newsId);
        return { message: 'News deleted successfully' };
    }
};
exports.NewsService = NewsService;
exports.NewsService = NewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService,
        typeorm_2.DataSource])
], NewsService);
//# sourceMappingURL=news.service.js.map