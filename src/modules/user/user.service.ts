import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { UserEntity } from "../../entities/User.entity";
import { DataSource, Repository } from "typeorm";
import { IncreaseBalanceDto } from "./dto/increaseBalance.dto";
import { ClsService } from "nestjs-cls";
import { ProfileUpdateDto } from "./dto/updateProfile.dto";
import { generateOtpExpireDate, generateOtpNumber } from "../../common/utils/randomNumber.utils";
import { MailerService } from "@nestjs-modules/mailer";
import { VerifyNewEmailDto } from "./dto/verifyNewEmail.dto";
import { EmailUpdateDto } from "./dto/updateEmail.dto";
import { RoleEntity } from "../../entities/Role.entity";
import { SetUserRoleDto } from "./dto/setUserRole.dto";
import { Role } from "../../common/enums/role.enum";

@Injectable({ scope: Scope.DEFAULT })
export class UserService {
    private userRepo: Repository<UserEntity>
    private roleRepo: Repository<RoleEntity>

    constructor(
        private cls: ClsService,
        private mailer: MailerService,
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.userRepo = this.dataSource.getRepository(UserEntity)
        this.roleRepo = this.dataSource.getRepository(RoleEntity)
    }

    async getUsers() {
        const currentUser = this.cls.get<UserEntity>('user');
        if (currentUser.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission for this operation');

        let users = await this.userRepo.find({
            relations: ['role'],
            select: {
                role: {
                    id: true,
                    name: true
                }
            }
        });
        if (!users || users.length === 0) throw new NotFoundException('Users not found');
        
        return users;
    }
    
    async getUser(userId: number) {
        let user = await this.userRepo.findOne({
            where: { id: userId },
            relations: ['role'],
            select: {
                role: {
                    id: true,
                    name: true
                }
            }
        });
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

    async deleteUser(userId: number) {
        const currentUser = this.cls.get<UserEntity>('user');

        const userToDelete = await this.userRepo.findOne({ where: { id: userId } });
        if (!userToDelete) throw new NotFoundException('User not found');

        if (currentUser.role.name === Role.ADMIN) {
            await this.userRepo.remove(userToDelete);
            return { message: 'User has been successfully deleted' };
        }

        if (currentUser.id !== userId) {
            throw new ForbiddenException({ message: 'You can only delete your own account' });
        }

        await this.userRepo.remove(userToDelete);
        return { message: 'Your account has been successfully deleted' };
    }

    async increaseBalance(params: IncreaseBalanceDto) {
        let user = this.cls.get<UserEntity>('user')
        user.balance += params.balance

        await this.userRepo.save(user)

        return { message: "Balance updated successfully", balance: user.balance }
    }

    async setUserRole(userId: number, params: SetUserRoleDto) {
        const currentUser = this.cls.get<UserEntity>('user');
        if (currentUser.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to assign roles');

        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        const role = await this.roleRepo.findOneBy({ id: params.role });
        if (!role) throw new NotFoundException('Role not found');

        user.role = role;
        await this.userRepo.save(user);
        return { message: 'User role updated successfully', user };
    }
}