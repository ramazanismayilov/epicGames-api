import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/User.entity";
import { DataSource, Repository } from "typeorm";
import { IncreaseBalanceDto } from "./dto/increaseBalance.dto";
import { ClsService } from "nestjs-cls";
import { ProfileUpdateDto } from "./dto/updateProfile.dto";
import { generateOtpExpireDate, generateOtpNumber } from "src/common/utils/randomNumber.utils";
import { MailerService } from "@nestjs-modules/mailer";
import { VerifyNewEmailDto } from "./dto/verifyNewEmail.dto";
import { EmailUpdateDto } from "./dto/updateEmail.dto";

@Injectable()
export class UserService {
    private userRepo: Repository<UserEntity>

    constructor(
        private cls: ClsService,
        private mailer: MailerService,
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.userRepo = this.dataSource.getRepository(UserEntity);
    }

    async getUsers() {
        let user = await this.userRepo.find();
        if (!user) throw new NotFoundException('User not found')
        return user
    }

    async getUser(userId: number) {
        let user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found')
        return user
    }

    async updateProfile(params: ProfileUpdateDto) {
        let user = this.cls.get<UserEntity>('user')
        if (params.firstname) user.firstname = params.firstname;
        if (params.lastname) user.lastname = params.lastname;
        if (params.username) user.username = params.username;

        await this.userRepo.save(user);
        return { message: 'Profile updated successfully', user };
    }

    async updateEmail(params: EmailUpdateDto) {
        let user = this.cls.get<UserEntity>('user')
        if (params.email === user.email) throw new ConflictException('Email is already in use.')
        if (params.email || params.email !== user.email) {
            user.pendingEmail = params.email
            user.otpCode = generateOtpNumber();
            user.otpExpiredAt = generateOtpExpireDate();

            await this.mailer.sendMail({
                to: params.email,
                subject: 'Confirm Your New Email',
                template: 'confirm-new-email',
                context: {
                    username: user.username,
                    otpCode: user.otpCode,
                },
            });
        }

        await this.userRepo.save(user);
        return { message: 'OTP sent to your email.' };
    }

    async verifyNewEmail(params: VerifyNewEmailDto) {
        const user = await this.userRepo.findOne({ where: { pendingEmail: params.email } });
        if (!user) throw new NotFoundException('User not found');

        if (!user.otpExpiredAt || new Date() > user.otpExpiredAt) {
            user.otpCode = null;
            user.otpExpiredAt = null;
            user.pendingEmail = null;
            await this.userRepo.save(user);
            throw new BadRequestException('OTP is expired.');
        }

        if (user.otpCode !== params.otpCode) throw new BadRequestException('OTP is incorrect.');

        user.email = user.pendingEmail!;
        user.pendingEmail = null;
        user.otpCode = null;
        user.otpExpiredAt = null;

        await this.userRepo.save(user);
        return { message: 'Email successfully updated' };
    }

    async increaseBalance(params: IncreaseBalanceDto) {
        let user = this.cls.get<UserEntity>('user')
        user.balance += params.balance

        await this.userRepo.save(user)

        return { message: "Balance updated successfully", balance: user.balance }
    }
}