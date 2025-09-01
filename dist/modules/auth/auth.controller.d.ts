import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { VerifyOtpDto } from "./dto/verify.dto";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refreshToken.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { CreateForgetPasswordDto } from "./dto/create-forget-password.dto";
import { ConfirmForgetPaswordDto } from "./dto/confirm-forget-password.dto";
import { ResentOtpDto } from "./dto/resent-otp.dto";
import { FirebaseDto } from "./dto/firebase.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: LoginDto): Promise<{
        message: string;
        token: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    register(body: RegisterDto): Promise<{
        message: string;
    }>;
    firebase(body: FirebaseDto): Promise<{
        message: string;
        token: string;
    }>;
    verifyOtp(body: VerifyOtpDto): Promise<{
        message: string;
    }>;
    resendOtp(body: ResentOtpDto): Promise<{
        message: string;
    }>;
    refreshToken(body: RefreshTokenDto): Promise<{
        accessToken: string;
    }>;
    resetPassword(body: ResetPasswordDto): Promise<{
        message: string;
    }>;
    createForgetPasswordRequest(body: CreateForgetPasswordDto): Promise<{
        message: string;
    }>;
    confirmPassword(body: ConfirmForgetPaswordDto): Promise<{
        message: string;
    }>;
    verify(token: string): Promise<{
        valid: boolean;
        userId: any;
    } | {
        valid: boolean;
        userId?: undefined;
    }>;
}
