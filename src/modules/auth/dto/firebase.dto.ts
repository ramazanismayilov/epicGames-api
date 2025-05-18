import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class FirebaseDto {
    @Type()
    @IsString()
    token: string;
}