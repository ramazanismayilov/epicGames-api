import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
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

    login() { }

    async register(params: RegisterDto) {
        let userExists = await this.userRepo.findOne({ where: { email: params.email } })
        if (userExists) throw new ConflictException('User already exists');

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
}