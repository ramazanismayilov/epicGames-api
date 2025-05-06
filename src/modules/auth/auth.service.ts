import { BadRequestException, ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectDataSource } from "@nestjs/typeorm";
import { UserEntity } from "../../entities/User.entity";
import { DataSource, MoreThan, Repository } from "typeorm";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid'
import { generateOtpExpireDate, generateOtpNumber } from "../../common/utils/randomNumber.utils";
import { MailerService } from "@nestjs-modules/mailer";
import { VerifyOtpDto } from "./dto/verify.dto";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refreshToken.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { ClsService } from "nestjs-cls";
import { CreateForgetPasswordDto } from "./dto/create-forget-password.dto";
import { UserActivationEntity } from "../../entities/UserActivation.entity";
import { addMinutes } from "date-fns";
import { ConfirmForgetPaswordDto } from "./dto/confirm-forget-password.dto";
import { validatePasswords } from "../../common/utils/password.utils";
import { ResentOtpDto } from "./dto/resent-otp.dto";
import { Role } from "../../common/enums/role.enum";
import { RoleEntity } from "../../entities/Role.entity";

@Injectable()
export class AuthService {
    private userRepo: Repository<UserEntity>
    private roleRepo: Repository<RoleEntity>
    private userActivationRepo: Repository<UserActivationEntity>

    constructor(
        private jwt: JwtService,
        private mailer: MailerService,
        private cls: ClsService,
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.userRepo = this.dataSource.getRepository(UserEntity)
        this.roleRepo = this.dataSource.getRepository(RoleEntity)
        this.userActivationRepo = this.dataSource.getRepository(UserActivationEntity)
    }

    async login(params: LoginDto) {
        let user = await this.userRepo.findOne({ where: { email: params.email } });
        if (!user) throw new UnauthorizedException('Email or passsword is wrong');

        if (!user.isVerified) {
            throw new ForbiddenException('Account is not verified');
        }

        let checkPassword = await bcrypt.compare(params.password, user.password);
        if (!checkPassword) throw new UnauthorizedException('Email or passsword is wrong');

        let accessToken = this.jwt.sign({ userId: user.id }, { expiresIn: '15m' });
        const refreshToken = v4()
        const refreshTokenDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        user.refreshToken = refreshToken;
        user.refreshTokenDate = refreshTokenDate;
        await this.userRepo.save(user);

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

        const role = await this.roleRepo.findOne({ where: { name: Role.USER } });
        if (!role) throw new NotFoundException('Role USER not found');

        let user = this.userRepo.create({
            ...params,
            password: hashedPassword,
            accountId: v4(),
            isVerified: false,
            otpCode: generateOtpNumber(),
            otpExpiredAt: generateOtpExpireDate(),
            role,
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

    async resendOtp(params: ResentOtpDto) {
        const user = await this.userRepo.findOne({ where: { email: params.email } });
        if (!user) throw new NotFoundException('User not found');
        if (user.isVerified) throw new BadRequestException('Account is already verified');

        user.otpCode = generateOtpNumber();
        user.otpExpiredAt = generateOtpExpireDate();

        await this.userRepo.save(user);

        await this.mailer.sendMail({
            to: params.email,
            subject: 'Verify Your Email – Epic Games!',
            template: 'verify-email',
            context: {
                username: user.username,
                otpCode: user.otpCode,
            },
        });

        return { message: 'OTP has been resent to your email.' };
    }

    async resetPassword(params: ResetPasswordDto) {
        let user = this.cls.get<UserEntity>('user')

        let checkPassword = await bcrypt.compare(params.currentPassword, user.password);
        if (!checkPassword) throw new BadRequestException('Current password is wrong');

        validatePasswords(params.newPassword, params.repeatPassword)

        const hashedPassword = await bcrypt.hash(params.newPassword, 10)
        user.password = hashedPassword

        await this.userRepo.save(user)
        return { message: 'Password is updated successfully' };
    }

    async createForgetPasswordRequest(params: CreateForgetPasswordDto) {
        let user = await this.userRepo.findOne({ where: { email: params.email } })
        if (!user) throw new NotFoundException('User not found')

        let activation = await this.userActivationRepo.findOne({
            where: {
                userId: user.id,
                expiredAt: MoreThan(new Date()),
            },
        });

        if (!activation) {
            activation = this.userActivationRepo.create({
                userId: user.id,
                token: v4(),
                expiredAt: addMinutes(new Date(), 30),
            });
        }

        const resetLink = `${params.callbackURL}?token=${activation.token}`;

        try {
            await this.mailer.sendMail({
                to: user.email,
                subject: `Forgot Password Request - Epic Games!`,
                template: 'forget-password',
                context: {
                    username: user.username,
                    resetLink,
                },
            })

            await this.userActivationRepo.save(activation)
            return { message: 'Mail has been successfully sent' };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Due some reasons, we cannot send mail for forgot-password');

        }

    }

    async confirmForgetPassword(params: ConfirmForgetPaswordDto) {
        let activation = await this.userActivationRepo.findOne({
            where: {
                token: params.token,
                expiredAt: MoreThan(new Date()),
            },
        });
        if (!activation) throw new BadRequestException('Token is not valid');

        validatePasswords(params.newPassword, params.repeatPassword)

        let user = await this.userRepo.findOne({ where: { id: activation.userId } });
        if (!user) throw new NotFoundException('User is not found');

        const hashedPassword = await bcrypt.hash(params.newPassword, 10);
        user.password = hashedPassword;
        await this.userRepo.save(user);

        await this.userActivationRepo.delete({ userId: user.id });

        return { message: 'Password is updated successfully' };
    }
}