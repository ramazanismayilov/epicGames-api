import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Auth } from "../../common/decorators/auth.decorator";
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

    @Post('menus')
    addMenu(@Body() body: MenuCreateDto) {
        return this.generalService.addMenu(body);
    }
}