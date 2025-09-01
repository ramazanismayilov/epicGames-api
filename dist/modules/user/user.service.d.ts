import { UserEntity } from "../../entities/User.entity";
import { DataSource } from "typeorm";
import { IncreaseBalanceDto } from "./dto/increaseBalance.dto";
import { ClsService } from "nestjs-cls";
import { ProfileUpdateDto } from "./dto/updateProfile.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { VerifyNewEmailDto } from "./dto/verifyNewEmail.dto";
import { EmailUpdateDto } from "./dto/updateEmail.dto";
import { SetUserRoleDto } from "./dto/setUserRole.dto";
export declare class UserService {
    private cls;
    private mailer;
    private dataSource;
    private userRepo;
    private roleRepo;
    constructor(cls: ClsService, mailer: MailerService, dataSource: DataSource);
    getUsers(): Promise<UserEntity[]>;
    getUser(userId: number): Promise<UserEntity>;
    updateProfile(params: ProfileUpdateDto): Promise<{
        message: string;
        user: UserEntity;
    }>;
    updateEmail(params: EmailUpdateDto): Promise<{
        message: string;
    }>;
    verifyNewEmail(params: VerifyNewEmailDto): Promise<{
        message: string;
    }>;
    deleteUser(userId: number): Promise<{
        message: string;
    }>;
    increaseBalance(params: IncreaseBalanceDto): Promise<{
        message: string;
        balance: number;
    }>;
    setUserRole(userId: number, params: SetUserRoleDto): Promise<{
        message: string;
        user: UserEntity;
    }>;
}
