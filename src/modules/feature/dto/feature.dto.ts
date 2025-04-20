import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class FeatureDto {
    @Type()
    @IsString()
    name: string;
}

export class AddFeatureDto extends FeatureDto { }
export class UpdateFeatureDto extends PartialType(FeatureDto) { }