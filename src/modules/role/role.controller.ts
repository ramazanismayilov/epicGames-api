import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { RoleService } from "./role.service";
import { Auth } from "src/common/decorators/auth.decorator";
import { RoleCreateDto } from "./dto/addRole.dto";

@Auth()
@Controller('roles')
export class RoleController {
    constructor(private roleService: RoleService) { }

    @Get()
    getRoles() {
        return this.roleService.getRoles()
    }

    @Get(':id')
    getRole(@Param('id') id: number) {
        return this.roleService.getRole(id)
    }

    @Post()
    async addRole(@Body() body: RoleCreateDto) {
        return this.roleService.addRole(body);
    }

    @Delete(':id')
    async deleteRole(@Param('id') id: number) {
        return this.roleService.deleteRole(id);
    }
}