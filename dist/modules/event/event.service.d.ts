import { ClsService } from "nestjs-cls";
import { EventEntity } from "../../entities/Event.entity";
import { DataSource } from "typeorm";
import { AddEventDto, UpdateEventDto } from "./dto/event.dto";
export declare class EventService {
    private cls;
    private dataSource;
    private eventRepo;
    constructor(cls: ClsService, dataSource: DataSource);
    getAllEvents(): Promise<EventEntity[]>;
    addEvent(params: AddEventDto): Promise<{
        message: string;
        event: EventEntity;
    }>;
    updateEvent(eventId: number, params: UpdateEventDto): Promise<{
        message: string;
        event: EventEntity;
    }>;
    deleteEvent(eventId: number): Promise<{
        message: string;
    }>;
}
