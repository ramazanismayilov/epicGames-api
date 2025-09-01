import { FeatureService } from "./feature.service";
import { AddFeatureDto, UpdateFeatureDto } from "./dto/feature.dto";
export declare class FeatureController {
    private featureService;
    constructor(featureService: FeatureService);
    getAllFeatures(): Promise<import("../../entities/Feature.entity").FeatureEntity[]>;
    addFeature(body: AddFeatureDto): Promise<{
        message: string;
        feature: import("../../entities/Feature.entity").FeatureEntity;
    }>;
    updateFeature(id: number, body: UpdateFeatureDto): Promise<{
        message: string;
        feature: import("../../entities/Feature.entity").FeatureEntity;
    }>;
    deleteFeature(id: number): Promise<{
        message: string;
    }>;
}
