import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class SetUserRoleDto {
    @Type(() => Number)
    @IsInt({ each: true })
    role: number;
}
