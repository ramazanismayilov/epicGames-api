export declare class NewsDto {
    mediaId: string;
    title: string;
    description: string;
}
export declare class AddNewsDto extends NewsDto {
}
declare const UpdateNewsDto_base: import("@nestjs/common").Type<Partial<NewsDto>>;
export declare class UpdateNewsDto extends UpdateNewsDto_base {
}
export declare class GetNewsDto {
    limit?: number;
    page?: number;
    search?: string;
}
export declare class DragAndDropDto {
    order: number;
}
export {};
