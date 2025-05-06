import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { FeatureService } from "./feature.service";
import { AddFeatureDto, UpdateFeatureDto } from "./dto/feature.dto";
import { Auth } from "../../common/decorators/auth.decorator";

@Controller('features')
export class FeatureController {
    constructor(private featureService: FeatureService) { }

    @Get()
    getAllFeatures() {
        return this.featureService.getAllFeatures();
    }

    @Post()
    @Auth()
    addFeature(@Body() body: AddFeatureDto) {
        return this.featureService.addFeature(body);
    }

    @Post(':id')
    @Auth()
    updateFeature(@Param('id') id: number, @Body() body: UpdateFeatureDto) {
        return this.featureService.updateFeature(id, body);
    }

    @Delete(':id')
    @Auth()
    deleteFeature(@Param('id') id: number) {
        return this.featureService.deleteFeature(id);
    }
}
