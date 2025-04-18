import { Module } from "@nestjs/common";
import { NewsController } from "./news.controller";
import { NewsService } from "./news.service";

@Module({
    imports: [],
    controllers: [NewsController],
    providers: [NewsService]
})
export class NewsModule { }