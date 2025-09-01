import { JwtService } from "@nestjs/jwt";
import { DataSource } from "typeorm";
import { RegisterDto } from "./dto/register.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { VerifyOtpDto } from "./dto/verify.dto";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refreshToken.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { ClsService } from "nestjs-cls";
import { CreateForgetPasswordDto } from "./dto/create-forget-password.dto";
import { ConfirmForgetPaswordDto } from "./dto/confirm-forget-password.dto";
import { ResentOtpDto } from "./dto/resent-otp.dto";
import { FirebaseDto } from "./dto/firebase.dto";
import { FirebaseService } from "../../libs/firebase/firebase.service";
export declare class AuthService {
    private jwt;
    private cls;
    private mailer;
    private firebaseService;
    private dataSource;
    private userRepo;
    private roleRepo;
    private userActivationRepo;
    constructor(jwt: JwtService, cls: ClsService, mailer: MailerService, firebaseService: FirebaseService, dataSource: DataSource);
    login(params: LoginDto): Promise<{
        message: string;
        token: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    register(params: RegisterDto): Promise<{
        message: string;
    }>;
    firebase(params: FirebaseDto): Promise<{
        message: string;
        token: string;
    }>;
    verifyOtp(params: VerifyOtpDto): Promise<{
        message: string;
    }>;
    refreshToken(params: RefreshTokenDto): Promise<{
        accessToken: string;
    }>;
    resendOtp(params: ResentOtpDto): Promise<{
        message: string;
    }>;
    resetPassword(params: ResetPasswordDto): Promise<{
        message: string;
    }>;
    createForgetPasswordRequest(params: CreateForgetPasswordDto): Promise<{
        message: string;
    }>;
    confirmForgetPassword(params: ConfirmForgetPaswordDto): Promise<{
        message: string;
    }>;
    verifyToken(token: string): {
        valid: boolean;
        userId: any;
    } | {
        valid: boolean;
        userId?: undefined;
    };
}
