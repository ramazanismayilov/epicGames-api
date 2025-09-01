"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_entity_1 = require("../../entities/User.entity");
const typeorm_2 = require("typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const randomNumber_utils_1 = require("../../common/utils/randomNumber.utils");
const mailer_1 = require("@nestjs-modules/mailer");
const Role_entity_1 = require("../../entities/Role.entity");
const role_enum_1 = require("../../common/enums/role.enum");
let UserService = class UserService {
    constructor(cls, mailer, dataSource) {
        this.cls = cls;
        this.mailer = mailer;
        this.dataSource = dataSource;
        this.userRepo = this.dataSource.getRepository(User_entity_1.UserEntity);
        this.roleRepo = this.dataSource.getRepository(Role_entity_1.RoleEntity);
    }
    async getUsers() {
        const currentUser = this.cls.get('user');
        if (currentUser.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission for this operation');
        let users = await this.userRepo.find({
            relations: ['role'],
            select: {
                role: {
                    id: true,
                    name: true
                }
            }
        });
        if (!users || users.length === 0)
            throw new common_1.NotFoundException('Users not found');
        return users;
    }
    async getUser(userId) {
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
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async updateProfile(params) {
        let user = this.cls.get('user');
        if (params.firstname)
            user.firstname = params.firstname;
        if (params.lastname)
            user.lastname = params.lastname;
        if (params.username)
            user.username = params.username;
        await this.userRepo.save(user);
        return { message: 'Profile updated successfully', user };
    }
    async updateEmail(params) {
        let user = this.cls.get('user');
        let email = await this.userRepo.findOne({ where: { email: params.email } });
        if (email)
            throw new common_1.ConflictException('This email address is already in use');
        if (params.email || params.email !== user.email) {
            user.pendingEmail = params.email;
            user.otpCode = (0, randomNumber_utils_1.generateOtpNumber)();
            user.otpExpiredAt = (0, randomNumber_utils_1.generateOtpExpireDate)();
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
    async verifyNewEmail(params) {
        const user = await this.userRepo.findOne({ where: { pendingEmail: params.email } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (!user.otpExpiredAt || new Date() > user.otpExpiredAt) {
            user.otpCode = null;
            user.otpExpiredAt = null;
            user.pendingEmail = null;
            await this.userRepo.save(user);
            throw new common_1.BadRequestException('OTP is expired.');
        }
        if (user.otpCode !== params.otpCode)
            throw new common_1.BadRequestException('OTP is incorrect.');
        user.email = user.pendingEmail;
        user.pendingEmail = null;
        user.otpCode = null;
        user.otpExpiredAt = null;
        await this.userRepo.save(user);
        return { message: 'Email successfully updated' };
    }
    async deleteUser(userId) {
        const currentUser = this.cls.get('user');
        const userToDelete = await this.userRepo.findOne({ where: { id: userId } });
        if (!userToDelete)
            throw new common_1.NotFoundException('User not found');
        if (currentUser.role.name === role_enum_1.Role.ADMIN) {
            await this.userRepo.remove(userToDelete);
            return { message: 'User has been successfully deleted' };
        }
        if (currentUser.id !== userId) {
            throw new common_1.ForbiddenException({ message: 'You can only delete your own account' });
        }
        await this.userRepo.remove(userToDelete);
        return { message: 'Your account has been successfully deleted' };
    }
    async increaseBalance(params) {
        let user = this.cls.get('user');
        user.balance += params.balance;
        await this.userRepo.save(user);
        return { message: "Balance updated successfully", balance: user.balance };
    }
    async setUserRole(userId, params) {
        const currentUser = this.cls.get('user');
        if (currentUser.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to assign roles');
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const role = await this.roleRepo.findOneBy({ id: params.role });
        if (!role)
            throw new common_1.NotFoundException('Role not found');
        user.role = role;
        await this.userRepo.save(user);
        return { message: 'User role updated successfully', user };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.DEFAULT }),
    __param(2, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService,
        mailer_1.MailerService,
        typeorm_2.DataSource])
], UserService);
//# sourceMappingURL=user.service.js.map