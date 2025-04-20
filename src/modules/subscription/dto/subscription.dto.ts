import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class SubscriptionDto {
    @Type()
    @IsString()
    name: string;
}

export class AddSubscriptionDto extends SubscriptionDto { }
export class UpdateSubscriptionDto extends PartialType(SubscriptionDto) { }