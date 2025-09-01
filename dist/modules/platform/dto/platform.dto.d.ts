export declare class PlatformDto {
    name: string;
}
export declare class AddPlatformDto extends PlatformDto {
}
declare const UpdatePlatformDto_base: import("@nestjs/common").Type<Partial<PlatformDto>>;
export declare class UpdatePlatformDto extends UpdatePlatformDto_base {
}
export {};
