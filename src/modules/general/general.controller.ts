import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Auth } from "../../common/decorators/auth.decorator";
import { RoleCreateDto } from "./dto/addRole.dto";
import { GeneralService } from "./general.service";
import { MenuCreateDto } from "./dto/addMenu.dto";

@Auth()
@Controller('general')
export class GeneralController {
    constructor(private generalService: GeneralService) { }

    @Get('roles')
    getRoles() {
        return this.generalService.getRoles()
    }

    @Get('menus')
    getMenus() {
        return this.generalService.getMenus()
    }

    @Post('roles')
    async addRole(@Body() body: RoleCreateDto) {
        return this.generalService.addRole(body);
    }

    @Post('menus')
    async addMenu(@Body() body: MenuCreateDto) {
        return this.generalService.addMenu(body);
    }

    @Delete('roles/:id')
    async deleteRole(@Param('id') id: number) {
        return this.generalService.deleteRole(id);
    }

    @Delete('menus/:id')
    async deleteMenu(@Param('id') id: number) {
        return this.generalService.deleteMenu(id);
    }
}