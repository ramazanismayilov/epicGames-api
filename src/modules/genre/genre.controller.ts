import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Auth } from "src/common/decorators/auth.decorator";
import { GenreService } from "./genre.service";
import { AddGenreDto, UpdateGenreDto } from "./dto/genre.dto";

@Controller('genres')
export class GenreController {
    constructor(private genreService: GenreService) { }

    @Get()
    getAllGenres() {
        return this.genreService.getAllGenres();
    }

    @Post()
    @Auth()
    addGenre(@Body() body: AddGenreDto) {
        return this.genreService.addGenre(body)
    }

    @Post(':id')
    @Auth()
    updateGenre(@Param('id') id: number, @Body() body: UpdateGenreDto) {
        return this.genreService.updateGenre(id, body)
    }

    @Delete(':id')
    @Auth()
    deleteGenre(@Param('id') id: number) {
        return this.genreService.deleteGenre(id)
    }
}