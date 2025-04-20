import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Auth } from "src/common/decorators/auth.decorator";
import { PlatformService } from "./platform.service";
import { AddPlatformDto, UpdatePlatformDto } from "./dto/platform.dto";

@Controller('platforms')
export class PlatformController {
    constructor(private platformService: PlatformService) { }

    @Get()
    getAllPlatforms() {
        return this.platformService.getAllPlatforms();
    }

    @Post()
    @Auth()
    addPlatform(@Body() body: AddPlatformDto) {
        return this.platformService.addPlatform(body)
    }

    @Post(':id')
    @Auth()
    updatePlatform(@Param('id') id: number, @Body() body: UpdatePlatformDto) {
        return this.platformService.updatePlatform(id, body)
    }

    @Delete(':id')
    @Auth()
    deletePlatform(@Param('id') id: number) {
        return this.platformService.deletePlatform(id)
    }
}
