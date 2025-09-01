import { NewsService } from "./news.service";
import { AddNewsDto, DragAndDropDto, GetNewsDto, UpdateNewsDto } from "./dto/news.dto";
export declare class NewsController {
    private newsService;
    constructor(newsService: NewsService);
    getAllNews(query: GetNewsDto): Promise<{
        data: import("../../entities/News.entity").NewsEntity[];
        count: number;
        limit: number;
        page: number;
        totalPages: number;
    }>;
    getNews(id: number): Promise<import("../../entities/News.entity").NewsEntity>;
    dragAndDrop(id: number, body: DragAndDropDto): Promise<{
        message: string;
    }>;
    addNews(body: AddNewsDto): Promise<{
        message: string;
        news: import("../../entities/News.entity").NewsEntity;
    }>;
    updateNews(id: number, body: UpdateNewsDto): Promise<{
        message: string;
        news: import("../../entities/News.entity").NewsEntity;
    }>;
    deleteNews(id: number): Promise<{
        message: string;
    }>;
}
