import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectDataSource } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/User.entity";
import { DataSource, Repository } from "typeorm";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid'
import { generateOtpExpireDate, generateOtpNumber } from "src/common/utils/randomNumber.utils";
import { MailerService } from "@nestjs-modules/mailer";
import { VerifyOtpDto } from "./dto/verify.dto";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refreshToken.dto";
import { ResetPasswordDto } from "./dto/reset-password";

@Injectable()
export class AuthService {
    private userRepo: Repository<UserEntity>

    constructor(
        private jwt: JwtService,
        private mailer: MailerService,
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.userRepo = this.dataSource.getRepository(UserEntity)
    }

    async login(params: LoginDto) {
        let user = await this.userRepo.findOne({ where: { email: params.email } });
        if (!user) throw new UnauthorizedException('Email or passsword is wrong');

        if (!user.isVerified) {
            throw new ForbiddenException('Account is not verified');
        }

        let checkPassword = await bcrypt.compare(params.password, user.password);
        if (!checkPassword) throw new UnauthorizedException('Email or passsword is wrong');

        const accessToken = this.jwt.sign({ userId: user.id }, { expiresIn: '15m' });
        const refreshToken = this.jwt.sign({ userId: user.id }, { expiresIn: '7d' });

        return {
            message: 'Login is successfully',
            token: {
                accessToken,
                refreshToken
            }
        }
    }

    async register(params: RegisterDto) {
        let emailExists = await this.userRepo.findOne({ where: { email: params.email } })
        if (emailExists) throw new ConflictException('Email already exists');

        let usernameExists = await this.userRepo.findOne({ where: { username: params.username } })
        if (usernameExists) throw new ConflictException('Username already exists');

        const hashedPassword = await bcrypt.hash(params.password, 10);

        let user = this.userRepo.create({
            ...params,
            password: hashedPassword,
            accountId: v4(),
            isVerified: false,
            otpCode: generateOtpNumber(),
            otpExpiredAt: generateOtpExpireDate(),
        })

        await this.userRepo.save(user)

        if (params.email) {
            await this.mailer.sendMail({
                to: params.email,
                subject: 'Verify Your Email – Epic Games!',
                template: 'verify-email',
                context: {
                    username: user.username,
                    otpCode: user.otpCode,
                },
            });
        }
        return { message: 'OTP sent to your email.' };
    }

    async verifyOtp(params: VerifyOtpDto) {
        const user = await this.userRepo.findOne({ where: { email: params.email } });
        if (!user) throw new NotFoundException('User not found')
        if (user.isVerified) throw new BadRequestException('Account is already active');

        if (user.otpCode !== params.otpCode || !user.otpExpiredAt || new Date() > user.otpExpiredAt) throw new BadRequestException('OTP is incorrect or expired.');
        user.isVerified = true;
        user.otpCode = null;
        user.otpExpiredAt = null;

        await this.userRepo.save(user);
        return { message: 'Account successfully activated' };
    }

    async refreshToken(params: RefreshTokenDto) {
        try {
            const payload = this.jwt.verify(params.refreshToken)

            const user = await this.userRepo.findOne({ where: { id: payload.userId } });
            if (!user) throw new UnauthorizedException('User not found')

            const newsAccessToken = this.jwt.sign({ userId: user.id }, { expiresIn: '15m' })
            return {
                token: {
                    newsAccessToken
                }
            }
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }
    }

    async resetPassword(params: ResetPasswordDto){}
}