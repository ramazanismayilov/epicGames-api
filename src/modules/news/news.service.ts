import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { Role } from "src/common/enums/role.enum";
import { NewsEntity } from "src/entities/News.entity";
import { UserEntity } from "src/entities/User.entity";
import { DataSource, Repository } from "typeorm";
import { AddNewsDto, UpdateNewsDto } from "./dto/news.dto";
import { MediaEntity } from "src/entities/Media.entity";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Injectable()
export class NewsService {
    private newsRepo: Repository<NewsEntity>
    private mediaRepo: Repository<MediaEntity>

    constructor(
        private cls: ClsService,
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.newsRepo = this.dataSource.getRepository(NewsEntity)
        this.mediaRepo = this.dataSource.getRepository(MediaEntity)

    }

    async getAllNews(params: PaginationDto) {
        const [news, total] = await this.newsRepo.findAndCount({
            relations: ['media'],
            select: {
                media: {
                    id: true,
                    url: true,
                    type: true,
                },
            },
            skip: (params.page - 1) * params.pageSize,
            take: params.pageSize,
        });

        if (news.length === 0) throw new NotFoundException('News not found');

        return {
            data: news,
            count: total,
            totalPage: Math.ceil(total / params.pageSize),
            currentPage: params.page,
        };
    }

    async getNews(newsId: number) {
        let news = await this.newsRepo.findOne({
            where:
                { id: newsId },
            relations: ['media'],
            select: {
                media: {
                    id: true,
                    url: true,
                    type: true
                }
            }
        })
        if (!news) throw new NotFoundException('News not found')

        return news
    }

    async addNews(params: AddNewsDto) {
        const user = this.cls.get<UserEntity>('user')
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to add news')

        let existingNews = await this.newsRepo.findOne({ where: { media: { id: params.mediaId } } })
        if (existingNews) throw new ConflictException("This media has already been used in another news entry");

        let media = await this.mediaRepo.findOne({ where: { id: params.mediaId } })
        if (!media) throw new NotFoundException("Media not found")

        let news = this.newsRepo.create({ ...params, media })
        await this.newsRepo.save(news)
        return { message: "News created successfully", news }
    }

    async updateNews(newsId: number, params: UpdateNewsDto) {
        const user = this.cls.get<UserEntity>('user')
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to add news')

        const news = await this.newsRepo.findOne({ where: { id: newsId }, relations: ['media'] });
        if (!news) throw new NotFoundException({ message: 'News not found' });

        if (params.mediaId) {
            let media = await this.mediaRepo.findOne({ where: { id: params.mediaId } })
            if (!media) throw new NotFoundException("Media not found")
            news.media = media
        }

        if (params.title) news.title = params.title;
        if (params.description) news.description = params.description;

        await this.newsRepo.save(news);
        return { message: 'News updated successfully', news };
    }

    async deleteNews(newsId: number) {
        const user = this.cls.get<UserEntity>('user')
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to delete news')

        let news = await this.newsRepo.findOne({ where: { id: newsId } })
        if (!news) throw new NotFoundException('News not found')

        await this.newsRepo.delete(newsId)
        return { message: 'News deleted successfully' }
    }
}