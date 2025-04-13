import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/User.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserService {
    private userRepo: Repository<UserEntity>

    constructor(
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.userRepo = this.dataSource.getRepository(UserEntity);
    }

    async getUser(userId: number) {
        let user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found')
        return user
    }
}