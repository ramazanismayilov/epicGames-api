import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { FeatureEntity } from "../../entities/Feature.entity";
import { DataSource, Repository } from "typeorm";
import { AddFeatureDto, UpdateFeatureDto } from "./dto/feature.dto";
import { UserEntity } from "../../entities/User.entity";
import { Role } from "../../common/enums/role.enum";

@Injectable()
export class FeatureService {
    private featureRepo: Repository<FeatureEntity>;

    constructor(
        private cls: ClsService,
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.featureRepo = this.dataSource.getRepository(FeatureEntity);
    }

    async getAllFeatures() {
        const features = await this.featureRepo.find();
        if (features.length === 0) throw new NotFoundException('Features not found');

        return features;
    }

    async addFeature(params: AddFeatureDto) {
        const user = this.cls.get<UserEntity>('user');
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to add feature');

        const feature = this.featureRepo.create(params);
        await this.featureRepo.save(feature);
        return { message: "Feature created successfully", feature };
    }

    async updateFeature(featureId: number, params: UpdateFeatureDto) {
        const user = this.cls.get<UserEntity>('user');
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to update feature');

        const feature = await this.featureRepo.findOne({ where: { id: featureId } });
        if (!feature) throw new NotFoundException({ message: 'Feature not found' });

        if (params.name) feature.name = params.name;
        await this.featureRepo.save(feature);
        return { message: 'Feature updated successfully', feature };
    }

    async deleteFeature(featureId: number) {
        const user = this.cls.get<UserEntity>('user');
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to delete feature');

        const feature = await this.featureRepo.findOne({ where: { id: featureId } });
        if (!feature) throw new NotFoundException('Feature not found');

        await this.featureRepo.delete(featureId);
        return { message: 'Feature deleted successfully' };
    }
}
