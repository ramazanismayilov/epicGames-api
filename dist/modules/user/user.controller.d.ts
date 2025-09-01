import { UserService } from "./user.service";
import { IncreaseBalanceDto } from "./dto/increaseBalance.dto";
import { ProfileUpdateDto } from "./dto/updateProfile.dto";
import { EmailUpdateDto } from "./dto/updateEmail.dto";
import { VerifyNewEmailDto } from "./dto/verifyNewEmail.dto";
import { SetUserRoleDto } from "./dto/setUserRole.dto";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsers(): Promise<import("../../entities/User.entity").UserEntity[]>;
    getUser(id: number): Promise<import("../../entities/User.entity").UserEntity>;
    updateProfile(body: ProfileUpdateDto): Promise<{
        message: string;
        user: import("../../entities/User.entity").UserEntity;
    }>;
    updateEmail(body: EmailUpdateDto): Promise<{
        message: string;
    }>;
    verifyNewEmail(body: VerifyNewEmailDto): Promise<{
        message: string;
    }>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
    increaseBalance(body: IncreaseBalanceDto): Promise<{
        message: string;
        balance: number;
    }>;
    setUserRole(id: number, body: SetUserRoleDto): Promise<{
        message: string;
        user: import("../../entities/User.entity").UserEntity;
    }>;
}
