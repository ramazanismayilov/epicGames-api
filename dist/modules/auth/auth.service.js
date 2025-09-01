"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const User_entity_1 = require("../../entities/User.entity");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const uuid_1 = require("uuid");
const randomNumber_utils_1 = require("../../common/utils/randomNumber.utils");
const mailer_1 = require("@nestjs-modules/mailer");
const nestjs_cls_1 = require("nestjs-cls");
const UserActivation_entity_1 = require("../../entities/UserActivation.entity");
const date_fns_1 = require("date-fns");
const password_utils_1 = require("../../common/utils/password.utils");
const role_enum_1 = require("../../common/enums/role.enum");
const Role_entity_1 = require("../../entities/Role.entity");
const firebase_service_1 = require("../../libs/firebase/firebase.service");
const provider_enum_1 = require("../../common/enums/provider.enum");
let AuthService = class AuthService {
    constructor(jwt, cls, mailer, firebaseService, dataSource) {
        this.jwt = jwt;
        this.cls = cls;
        this.mailer = mailer;
        this.firebaseService = firebaseService;
        this.dataSource = dataSource;
        this.userRepo = this.dataSource.getRepository(User_entity_1.UserEntity);
        this.roleRepo = this.dataSource.getRepository(Role_entity_1.RoleEntity);
        this.userActivationRepo = this.dataSource.getRepository(UserActivation_entity_1.UserActivationEntity);
    }
    async login(params) {
        let user = await this.userRepo.findOne({ where: { email: params.email } });
        if (!user)
            throw new common_1.UnauthorizedException('Email or passsword is wrong');
        if (!user.isVerified) {
            throw new common_1.ForbiddenException('Account is not verified');
        }
        let checkPassword = await bcrypt.compare(params.password, user.password);
        if (!checkPassword)
            throw new common_1.UnauthorizedException('Email or passsword is wrong');
        let accessToken = this.jwt.sign({ userId: user.id }, { expiresIn: '15m' });
        const refreshToken = (0, uuid_1.v4)();
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
        };
    }
    async register(params) {
        let emailExists = await this.userRepo.findOne({ where: { email: params.email } });
        if (emailExists)
            throw new common_1.ConflictException('Email already exists');
        let usernameExists = await this.userRepo.findOne({ where: { username: params.username } });
        if (usernameExists)
            throw new common_1.ConflictException('Username already exists');
        const hashedPassword = await bcrypt.hash(params.password, 10);
        const role = await this.roleRepo.findOne({ where: { name: role_enum_1.Role.USER } });
        if (!role)
            throw new common_1.NotFoundException('Role USER not found');
        let user = this.userRepo.create({
            ...params,
            password: hashedPassword,
            accountId: (0, uuid_1.v4)(),
            isVerified: false,
            otpCode: (0, randomNumber_utils_1.generateOtpNumber)(),
            otpExpiredAt: (0, randomNumber_utils_1.generateOtpExpireDate)(),
            role,
        });
        await this.userRepo.save(user);
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
    async firebase(params) {
        let admin = this.firebaseService.firebaseApp;
        let firebaseResult = await admin.auth().verifyIdToken(params.token);
        if (!firebaseResult?.uid)
            throw new common_1.InternalServerErrorException('Something went wrong');
        let uid = firebaseResult.uid;
        let email = firebaseResult.email;
        let where = [{ providerId: uid, provider: provider_enum_1.Provider.FIREBASE }];
        if (email)
            where.push({ email });
        let user = await this.userRepo.findOne({ where });
        const role = await this.roleRepo.findOneBy({ name: role_enum_1.Role.USER });
        if (!role)
            throw new common_1.NotFoundException('Role not found');
        if (!user) {
            user = this.userRepo.create({
                username: firebaseResult.name,
                firstname: firebaseResult.name,
                lastname: firebaseResult.name,
                email,
                pendingEmail: null,
                password: (0, uuid_1.v4)(),
                dateOfBirth: '2005-10-22',
                country: 'Azerbaijan',
                balance: 0,
                accountId: (0, uuid_1.v4)(),
                isVerified: true,
                otpCode: null,
                otpExpiredAt: null,
                refreshToken: null,
                refreshTokenDate: null,
                provider: provider_enum_1.Provider.FIREBASE,
                providerId: uid,
                role
            });
            await this.userRepo.save(user);
        }
        let token = this.jwt.sign({ userId: user.id });
        return { message: "Signup is successfully", token };
    }
    async verifyOtp(params) {
        const user = await this.userRepo.findOne({ where: { email: params.email } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.isVerified)
            throw new common_1.BadRequestException('Account is already active');
        if (user.otpCode !== params.otpCode || !user.otpExpiredAt || new Date() > user.otpExpiredAt)
            throw new common_1.BadRequestException('OTP is incorrect or expired.');
        user.isVerified = true;
        user.otpCode = null;
        user.otpExpiredAt = null;
        await this.userRepo.save(user);
        return { message: 'Account successfully activated' };
    }
    async refreshToken(params) {
        const user = await this.userRepo.findOne({ where: { refreshToken: params.refreshToken } });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const accessToken = this.jwt.sign({ userId: user.id }, { expiresIn: '15m' });
        return { accessToken };
    }
    async resendOtp(params) {
        const user = await this.userRepo.findOne({ where: { email: params.email } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.isVerified)
            throw new common_1.BadRequestException('Account is already verified');
        user.otpCode = (0, randomNumber_utils_1.generateOtpNumber)();
        user.otpExpiredAt = (0, randomNumber_utils_1.generateOtpExpireDate)();
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
    async resetPassword(params) {
        let user = this.cls.get('user');
        let checkPassword = await bcrypt.compare(params.currentPassword, user.password);
        if (!checkPassword)
            throw new common_1.BadRequestException('Current password is wrong');
        (0, password_utils_1.validatePasswords)(params.newPassword, params.repeatPassword);
        const hashedPassword = await bcrypt.hash(params.newPassword, 10);
        user.password = hashedPassword;
        await this.userRepo.save(user);
        return { message: 'Password is updated successfully' };
    }
    async createForgetPasswordRequest(params) {
        let user = await this.userRepo.findOne({ where: { email: params.email } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        let activation = await this.userActivationRepo.findOne({
            where: {
                userId: user.id,
                expiredAt: (0, typeorm_2.MoreThan)(new Date()),
            },
        });
        if (!activation) {
            activation = this.userActivationRepo.create({
                userId: user.id,
                token: (0, uuid_1.v4)(),
                expiredAt: (0, date_fns_1.addMinutes)(new Date(), 30),
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
            });
            await this.userActivationRepo.save(activation);
            return { message: 'Mail has been successfully sent' };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Due some reasons, we cannot send mail for forgot-password');
        }
    }
    async confirmForgetPassword(params) {
        let activation = await this.userActivationRepo.findOne({
            where: {
                token: params.token,
                expiredAt: (0, typeorm_2.MoreThan)(new Date()),
            },
        });
        if (!activation)
            throw new common_1.BadRequestException('Token is not valid');
        (0, password_utils_1.validatePasswords)(params.newPassword, params.repeatPassword);
        let user = await this.userRepo.findOne({ where: { id: activation.userId } });
        if (!user)
            throw new common_1.NotFoundException('User is not found');
        const hashedPassword = await bcrypt.hash(params.newPassword, 10);
        user.password = hashedPassword;
        await this.userRepo.save(user);
        await this.userActivationRepo.delete({ userId: user.id });
        return { message: 'Password is updated successfully' };
    }
    verifyToken(token) {
        try {
            const payload = this.jwt.verify(token);
            return { valid: true, userId: payload.userId };
        }
        catch (e) {
            if (e.name === 'TokenExpiredError') {
                return { valid: false };
            }
            return { valid: false };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        nestjs_cls_1.ClsService,
        mailer_1.MailerService,
        firebase_service_1.FirebaseService,
        typeorm_2.DataSource])
], AuthService);
//# sourceMappingURL=auth.service.js.map