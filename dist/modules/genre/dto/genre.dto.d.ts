export declare class GenreDto {
    name: string;
}
export declare class AddGenreDto extends GenreDto {
}
declare const UpdateGenreDto_base: import("@nestjs/common").Type<Partial<GenreDto>>;
export declare class UpdateGenreDto extends UpdateGenreDto_base {
}
export {};
