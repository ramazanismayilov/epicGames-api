import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../../entities/User.entity";
import { Role } from "../../common/enums/role.enum";
import { GenreEntity } from "../../entities/Genre.entity";
import { AddGenreDto, UpdateGenreDto } from "./dto/genre.dto";

@Injectable()
export class GenreService {
    private genreRepo: Repository<GenreEntity>

    constructor(
        private cls: ClsService,
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.genreRepo = this.dataSource.getRepository(GenreEntity)
    }

    async getAllGenres() {
        const genres = await this.genreRepo.find();
        if (genres.length === 0) throw new NotFoundException('Genres not found');

        return genres;
    }

    async addGenre(params: AddGenreDto) {
        const user = this.cls.get<UserEntity>('user')
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to add genre')

        let genre = this.genreRepo.create(params)
        await this.genreRepo.save(genre)
        return { message: "Genre created successfully", genre }
    }

    async updateGenre(genreId: number, params: UpdateGenreDto) {
        const user = this.cls.get<UserEntity>('user')
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to add genre')

        const genre = await this.genreRepo.findOne({ where: { id: genreId } });
        if (!genre) throw new NotFoundException({ message: 'Genre not found' });

        if (params.name) genre.name = params.name
        await this.genreRepo.save(genre);
        return { message: 'Genre updated successfully', genre };
    }

    async deleteGenre(genreId: number) {
        const user = this.cls.get<UserEntity>('user')
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to delete genre')

        let genre = await this.genreRepo.findOne({ where: { id: genreId } })
        if (!genre) throw new NotFoundException('Genre not found')

        await this.genreRepo.delete(genreId)
        return { message: 'Genre deleted successfully' }
    }
}