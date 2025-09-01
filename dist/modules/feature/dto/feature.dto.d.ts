export declare class FeatureDto {
    name: string;
}
export declare class AddFeatureDto extends FeatureDto {
}
declare const UpdateFeatureDto_base: import("@nestjs/common").Type<Partial<FeatureDto>>;
export declare class UpdateFeatureDto extends UpdateFeatureDto_base {
}
export {};
