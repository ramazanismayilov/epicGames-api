import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { EventEntity } from "src/entities/Event.entity";
import { DataSource, Repository } from "typeorm";
import { AddEventDto, UpdateEventDto } from "./dto/event.dto";
import { UserEntity } from "src/entities/User.entity";
import { Role } from "src/common/enums/role.enum";

@Injectable()
export class EventService {
    private eventRepo: Repository<EventEntity>

    constructor(
        private cls: ClsService,
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.eventRepo = this.dataSource.getRepository(EventEntity)
    }

    async getAllEvents() {
        const events = await this.eventRepo.find();
        if (events.length === 0) throw new NotFoundException('Events not found');

        return events;
    }

    async addEvent(params: AddEventDto) {
        const user = this.cls.get<UserEntity>('user')
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to add event')

        let event = this.eventRepo.create(params)
        await this.eventRepo.save(event)
        return { message: "Event created successfully", event }
    }

    async updateEvent(eventId: number, params: UpdateEventDto) {
        const user = this.cls.get<UserEntity>('user')
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to add event')

        const event = await this.eventRepo.findOne({ where: { id: eventId } });
        if (!event) throw new NotFoundException({ message: 'Event not found' });

        if (params.name) event.name = params.name
        await this.eventRepo.save(event);
        return { message: 'Event updated successfully', event };
    }

    async deleteEvent(eventId: number) {
        const user = this.cls.get<UserEntity>('user')
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to delete event')

        let event = await this.eventRepo.findOne({ where: { id: eventId } })
        if (!event) throw new NotFoundException('Event not found')

        await this.eventRepo.delete(eventId)
        return { message: 'Event deleted successfully' }
    }
}