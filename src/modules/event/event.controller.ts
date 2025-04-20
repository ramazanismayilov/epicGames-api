import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { EventService } from "./event.service";
import { AddEventDto, UpdateEventDto } from "./dto/event.dto";
import { Auth } from "src/common/decorators/auth.decorator";

@Controller('events')
export class EventController {
    constructor(private eventService: EventService) { }

    @Get()
    getAllEvents() {
        return this.eventService.getAllEvents();
    }

    @Post()
    @Auth()
    addEvents(@Body() body: AddEventDto) {
        return this.eventService.addEvent(body)
    }

    @Post(':id')
    @Auth()
    updateEvent(@Param('id') id: number, @Body() body: UpdateEventDto) {
        return this.eventService.updateEvent(id, body)
    }

    @Delete(':id')
    @Auth()
    deleteEvent(@Param('id') id: number) {
        return this.eventService.deleteEvent(id)
    }
}