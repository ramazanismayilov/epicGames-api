export declare class TypeDto {
    name: string;
}
export declare class AddTypeDto extends TypeDto {
}
declare const UpdateTypeDto_base: import("@nestjs/common").Type<Partial<TypeDto>>;
export declare class UpdateTypeDto extends UpdateTypeDto_base {
}
export {};
