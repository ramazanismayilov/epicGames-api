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
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const typeorm_2 = require("typeorm");
const role_enum_1 = require("../../common/enums/role.enum");
const Subscription_entity_1 = require("../../entities/Subscription.entity");
let SubscriptionService = class SubscriptionService {
    constructor(cls, dataSource) {
        this.cls = cls;
        this.dataSource = dataSource;
        this.subscriptionRepo = this.dataSource.getRepository(Subscription_entity_1.SubscriptionEntity);
    }
    async getAllSubscriptions() {
        const subscriptions = await this.subscriptionRepo.find();
        if (subscriptions.length === 0)
            throw new common_1.NotFoundException('Subscriptions not found');
        return subscriptions;
    }
    async addSubscription(params) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to add subscription');
        let subscription = this.subscriptionRepo.create(params);
        await this.subscriptionRepo.save(subscription);
        return { message: "Subscription created successfully", subscription };
    }
    async updateSubscription(subscriptionId, params) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to add subscription');
        const subscription = await this.subscriptionRepo.findOne({ where: { id: subscriptionId } });
        if (!subscription)
            throw new common_1.NotFoundException({ message: 'Subscription not found' });
        if (params.name)
            subscription.name = params.name;
        await this.subscriptionRepo.save(subscription);
        return { message: 'Subscription updated successfully', subscription };
    }
    async deleteSubscription(subscriptionId) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to delete subscription');
        let subscription = await this.subscriptionRepo.findOne({ where: { id: subscriptionId } });
        if (!subscription)
            throw new common_1.NotFoundException('Subscription not found');
        await this.subscriptionRepo.delete(subscriptionId);
        return { message: 'Subscription deleted successfully' };
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService,
        typeorm_2.DataSource])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map