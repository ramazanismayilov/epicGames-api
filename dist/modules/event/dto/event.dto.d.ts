export declare class EventDto {
    name: string;
}
export declare class AddEventDto extends EventDto {
}
declare const UpdateEventDto_base: import("@nestjs/common").Type<Partial<EventDto>>;
export declare class UpdateEventDto extends UpdateEventDto_base {
}
export {};
