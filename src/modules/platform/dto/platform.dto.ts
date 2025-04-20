import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class PlatformDto {
    @Type()
    @IsString()
    name: string;
}

export class AddPlatformDto extends PlatformDto { }
export class UpdatePlatformDto extends PartialType(PlatformDto) { }