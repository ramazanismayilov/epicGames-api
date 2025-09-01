"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const Event_entity_1 = require("../../entities/Event.entity");
const typeorm_2 = require("typeorm");
const role_enum_1 = require("../../common/enums/role.enum");
let EventService = class EventService {
    constructor(cls, dataSource) {
        this.cls = cls;
        this.dataSource = dataSource;
        this.eventRepo = this.dataSource.getRepository(Event_entity_1.EventEntity);
    }
    async getAllEvents() {
        const events = await this.eventRepo.find();
        if (events.length === 0)
            throw new common_1.NotFoundException('Events not found');
        return events;
    }
    async addEvent(params) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to add event');
        let event = this.eventRepo.create(params);
        await this.eventRepo.save(event);
        return { message: "Event created successfully", event };
    }
    async updateEvent(eventId, params) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to add event');
        const event = await this.eventRepo.findOne({ where: { id: eventId } });
        if (!event)
            throw new common_1.NotFoundException({ message: 'Event not found' });
        if (params.name)
            event.name = params.name;
        await this.eventRepo.save(event);
        return { message: 'Event updated successfully', event };
    }
    async deleteEvent(eventId) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to delete event');
        let event = await this.eventRepo.findOne({ where: { id: eventId } });
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        await this.eventRepo.delete(eventId);
        return { message: 'Event deleted successfully' };
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService,
        typeorm_2.DataSource])
], EventService);
//# sourceMappingURL=event.service.js.map