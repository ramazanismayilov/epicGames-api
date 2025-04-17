import { Type } from "class-transformer";
import { IsEnum, IsString } from "class-validator";
import { Role } from "src/common/enums/role.enum";

export class RoleCreateDto {
    @Type()
    @IsString()
    @IsEnum(Role)
    name: Role
}