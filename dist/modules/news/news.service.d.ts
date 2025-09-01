import { ClsService } from "nestjs-cls";
import { NewsEntity } from "../../entities/News.entity";
import { DataSource } from "typeorm";
import { AddNewsDto, DragAndDropDto, GetNewsDto, UpdateNewsDto } from "./dto/news.dto";
export declare class NewsService {
    private cls;
    private dataSource;
    private newsRepo;
    private mediaRepo;
    constructor(cls: ClsService, dataSource: DataSource);
    getAllNews(query: GetNewsDto): Promise<{
        data: NewsEntity[];
        count: number;
        limit: number;
        page: number;
        totalPages: number;
    }>;
    getNews(newsId: number): Promise<NewsEntity>;
    dragAndDrop(newsId: number, params: DragAndDropDto): Promise<{
        message: string;
    }>;
    addNews(params: AddNewsDto): Promise<{
        message: string;
        news: NewsEntity;
    }>;
    updateNews(newsId: number, params: UpdateNewsDto): Promise<{
        message: string;
        news: NewsEntity;
    }>;
    deleteNews(newsId: number): Promise<{
        message: string;
    }>;
}
