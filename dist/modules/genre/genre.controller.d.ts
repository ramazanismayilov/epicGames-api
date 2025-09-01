import { GenreService } from "./genre.service";
import { AddGenreDto, UpdateGenreDto } from "./dto/genre.dto";
export declare class GenreController {
    private genreService;
    constructor(genreService: GenreService);
    getAllGenres(): Promise<import("../../entities/Genre.entity").GenreEntity[]>;
    addGenre(body: AddGenreDto): Promise<{
        message: string;
        genre: import("../../entities/Genre.entity").GenreEntity;
    }>;
    updateGenre(id: number, body: UpdateGenreDto): Promise<{
        message: string;
        genre: import("../../entities/Genre.entity").GenreEntity;
    }>;
    deleteGenre(id: number): Promise<{
        message: string;
    }>;
}
