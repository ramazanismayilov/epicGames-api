import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { Auth } from "src/common/decorators/auth.decorator";
import { IncreaseBalanceDto } from "./dto/increaseBalance.dto";
import { ProfileUpdateDto } from "./dto/updateProfile.dto";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    getUsers() {
        return this.userService.getUsers()
    }

    @Get(':id')
    getUser(@Param('id') id: number) {
        return this.userService.getUser(id)
    }

    @Post('profile')
    @Auth()
    async updateProfile(@Body() body: ProfileUpdateDto) {
        return this.userService.updateProfile(body);
    }

    @Post('increaseBalance')
    @Auth()
    async increaseBalance(@Body() body: IncreaseBalanceDto) {
        return this.userService.increaseBalance(body);
    }
}