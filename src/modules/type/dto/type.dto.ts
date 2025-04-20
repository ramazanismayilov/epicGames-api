import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class TypeDto {
    @Type()
    @IsString()
    name: string;
}

export class AddTypeDto extends TypeDto { }
export class UpdateTypeDto extends PartialType(TypeDto) { }