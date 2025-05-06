import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { Auth } from "../../common/decorators/auth.decorator";
import { IncreaseBalanceDto } from "./dto/increaseBalance.dto";
import { ProfileUpdateDto } from "./dto/updateProfile.dto";
import { EmailUpdateDto } from "./dto/updateEmail.dto";
import { VerifyNewEmailDto } from "./dto/verifyNewEmail.dto";
import { SetUserRoleDto } from "./dto/setUserRole.dto";

@Auth()
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

    @Post('updateProfile')
    async updateProfile(@Body() body: ProfileUpdateDto) {
        return this.userService.updateProfile(body);
    }

    @Post('updateEmail')
    async updateEmail(@Body() body: EmailUpdateDto) {
        return this.userService.updateEmail(body);
    }

    @Post('verifyNewEmail')
    async verifyNewEmail(@Body() body: VerifyNewEmailDto) {
        return this.userService.verifyNewEmail(body);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        return this.userService.deleteUser(id);
    }

    @Post('increaseBalance')
    async increaseBalance(@Body() body: IncreaseBalanceDto) {
        return this.userService.increaseBalance(body);
    }

    @Post(':id/setRole')
    async setUserRole(@Param('id') id: number, @Body() body: SetUserRoleDto) {
        return this.userService.setUserRole(id, body);
    }
}