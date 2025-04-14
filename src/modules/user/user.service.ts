import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/User.entity";
import { DataSource, Repository } from "typeorm";
import { IncreaseBalanceDto } from "./dto/increaseBalance.dto";
import { ClsService } from "nestjs-cls";
import { ProfileUpdateDto } from "./dto/updateProfile.dto";

@Injectable()
export class UserService {
    private userRepo: Repository<UserEntity>

    constructor(
        private cls: ClsService,
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
    }

    async increaseBalance(params: IncreaseBalanceDto) {
        let user = this.cls.get<UserEntity>('user')
        user.balance += params.balance

        await this.userRepo.save(user)

        return { message: "Balance updated successfully", balance: user.balance }
    }
}