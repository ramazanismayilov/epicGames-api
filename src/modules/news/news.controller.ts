import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { NewsService } from "./news.service";
import { Auth } from "src/common/decorators/auth.decorator";
import { AddNewsDto, NewsPagination, UpdateNewsDto } from "./dto/news.dto";

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService) { }

    @Get()
    getAllNews(@Query() params: NewsPagination) {
        return this.newsService.getAllNews(params);
    }

    @Get(':id')
    getNews(@Param('id') id: number) {
        return this.newsService.getNews(id)
    }

    @Post()
    @Auth()
    addNews(@Body() body: AddNewsDto) {
        return this.newsService.addNews(body)
    }

    @Post('id')
    @Auth()
    updateNews(@Param('id') id: number, @Body() body: UpdateNewsDto) {
        return this.newsService.updateNews(id, body)
    }

    @Delete(':id')
    @Auth()
    deleteNews(@Param('id') id: number) {
        return this.newsService.deleteNews(id)
    }
}