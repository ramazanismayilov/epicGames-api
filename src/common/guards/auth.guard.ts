import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClsService } from "nestjs-cls";
import { UserService } from "../../modules/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private jwt: JwtService, private cls: ClsService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        let req = context.switchToHttp().getRequest()

        let token = req.headers.authorization || ''
        token = token.split(' ')[1];
        if (!token) throw new UnauthorizedException('unauthorized');

        try {
            let payload = this.jwt.verify(token);
            if (!payload.userId) throw new UnauthorizedException('Invalid token payload');

            let user = await this.userService.getUser(payload.userId);
            if (!user) throw new UnauthorizedException('User not found');

            req.user = user;
            
            this.cls.set('user', user);
            return true
        } catch (error) {
            console.log("Error", error);
            throw new UnauthorizedException();
        }
    }
}