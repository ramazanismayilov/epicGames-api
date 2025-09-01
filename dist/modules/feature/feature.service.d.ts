import { ClsService } from "nestjs-cls";
import { FeatureEntity } from "../../entities/Feature.entity";
import { DataSource } from "typeorm";
import { AddFeatureDto, UpdateFeatureDto } from "./dto/feature.dto";
export declare class FeatureService {
    private cls;
    private dataSource;
    private featureRepo;
    constructor(cls: ClsService, dataSource: DataSource);
    getAllFeatures(): Promise<FeatureEntity[]>;
    addFeature(params: AddFeatureDto): Promise<{
        message: string;
        feature: FeatureEntity;
    }>;
    updateFeature(featureId: number, params: UpdateFeatureDto): Promise<{
        message: string;
        feature: FeatureEntity;
    }>;
    deleteFeature(featureId: number): Promise<{
        message: string;
    }>;
}
