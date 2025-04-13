import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { VerifyOtpDto } from "./dto/verify.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    register(@Body() body: RegisterDto) {
        return this.authService.register(body)
    }

    @Post('verifyOtp')
    verifyOtp(@Body() body: VerifyOtpDto) {
        return this.authService.verifyOtp(body)
    }
}