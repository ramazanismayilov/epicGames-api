import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

export const Auth = () => {
    return applyDecorators(
        UseGuards(AuthGuard),
        ApiBearerAuth()
    );
}