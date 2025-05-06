import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Auth } from "../../common/decorators/auth.decorator";
import { TypeService } from "./type.service";
import { AddTypeDto, UpdateTypeDto } from "./dto/type.dto";

@Controller('types')
export class TypeController {
    constructor(private typeService: TypeService) { }

    @Get()
    getAllTypes() {
        return this.typeService.getAllTypes();
    }

    @Post()
    @Auth()
    addType(@Body() body: AddTypeDto) {
        return this.typeService.addType(body)
    }

    @Post(':id')
    @Auth()
    updateType(@Param('id') id: number, @Body() body: UpdateTypeDto) {
        return this.typeService.updateType(id, body)
    }

    @Delete(':id')
    @Auth()
    deleteType(@Param('id') id: number) {
        return this.typeService.deleteType(id)
    }
}
