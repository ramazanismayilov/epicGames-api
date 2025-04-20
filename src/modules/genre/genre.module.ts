import { Module } from "@nestjs/common";
import { GenreController } from "./genre.controller";
import { GenreService } from "./genre.service";

@Module({
    imports: [],
    controllers: [GenreController],
    providers: [GenreService]
})
export class GenreModule { }