import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClsService } from "nestjs-cls";
import { UserService } from "../../modules/user/user.service";
export declare class AuthGuard implements CanActivate {
    private userService;
    private jwt;
    private cls;
    constructor(userService: UserService, jwt: JwtService, cls: ClsService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
