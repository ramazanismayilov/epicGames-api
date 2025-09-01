import { MediaEntity } from "./Media.entity";
export declare class NewsEntity {
    id: number;
    media: MediaEntity;
    title: string;
    description: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
