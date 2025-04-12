import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectDataSource } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/User.entity";
import { DataSource, Repository } from "typeorm";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
    private userRepo: Repository<UserEntity>

    constructor(
        private jwt: JwtService,
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.userRepo = this.dataSource.getRepository(UserEntity)
    }

    login() { }

    async register(params: RegisterDto) {
        let userExists = await this.userRepo.findOne({ where: { email: params.email } })
        if (userExists) throw new NotFoundException('User already exists');
    }
}