import { ClsService } from "nestjs-cls";
import { DataSource } from "typeorm";
import { GenreEntity } from "../../entities/Genre.entity";
import { AddGenreDto, UpdateGenreDto } from "./dto/genre.dto";
export declare class GenreService {
    private cls;
    private dataSource;
    private genreRepo;
    constructor(cls: ClsService, dataSource: DataSource);
    getAllGenres(): Promise<GenreEntity[]>;
    addGenre(params: AddGenreDto): Promise<{
        message: string;
        genre: GenreEntity;
    }>;
    updateGenre(genreId: number, params: UpdateGenreDto): Promise<{
        message: string;
        genre: GenreEntity;
    }>;
    deleteGenre(genreId: number): Promise<{
        message: string;
    }>;
}
