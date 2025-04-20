import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class EventDto {
    @Type()
    @IsString()
    name: string;
}

export class AddEventDto extends EventDto { }
export class UpdateEventDto extends PartialType(EventDto) { }