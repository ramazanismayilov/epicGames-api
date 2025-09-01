import { EventService } from "./event.service";
import { AddEventDto, UpdateEventDto } from "./dto/event.dto";
export declare class EventController {
    private eventService;
    constructor(eventService: EventService);
    getAllEvents(): Promise<import("../../entities/Event.entity").EventEntity[]>;
    addEvents(body: AddEventDto): Promise<{
        message: string;
        event: import("../../entities/Event.entity").EventEntity;
    }>;
    updateEvent(id: number, body: UpdateEventDto): Promise<{
        message: string;
        event: import("../../entities/Event.entity").EventEntity;
    }>;
    deleteEvent(id: number): Promise<{
        message: string;
    }>;
}
