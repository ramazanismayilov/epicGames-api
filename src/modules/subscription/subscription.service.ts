import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "src/entities/User.entity";
import { Role } from "src/common/enums/role.enum";
import { SubscriptionEntity } from "src/entities/Subscription.entity";
import { AddSubscriptionDto, UpdateSubscriptionDto } from "./dto/subscription.dto";

@Injectable()
export class SubscriptionService {
    private subscriptionRepo: Repository<SubscriptionEntity>;

    constructor(
        private cls: ClsService,
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.subscriptionRepo = this.dataSource.getRepository(SubscriptionEntity);
    }

    async getAllSubscriptions() {
        const subscriptions = await this.subscriptionRepo.find();
        if (subscriptions.length === 0) throw new NotFoundException('Subscriptions not found');

        return subscriptions;
    }

    async addSubscription(params: AddSubscriptionDto) {
        const user = this.cls.get<UserEntity>('user');
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to add subscription');

        let subscription = this.subscriptionRepo.create(params);
        await this.subscriptionRepo.save(subscription);
        return { message: "Subscription created successfully", subscription };
    }

    async updateSubscription(subscriptionId: number, params: UpdateSubscriptionDto) {
        const user = this.cls.get<UserEntity>('user');
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to add subscription');

        const subscription = await this.subscriptionRepo.findOne({ where: { id: subscriptionId } });
        if (!subscription) throw new NotFoundException({ message: 'Subscription not found' });

        if (params.name) subscription.name = params.name;
        await this.subscriptionRepo.save(subscription);
        return { message: 'Subscription updated successfully', subscription };
    }

    async deleteSubscription(subscriptionId: number) {
        const user = this.cls.get<UserEntity>('user');
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to delete subscription');

        let subscription = await this.subscriptionRepo.findOne({ where: { id: subscriptionId } });
        if (!subscription) throw new NotFoundException('Subscription not found');

        await this.subscriptionRepo.delete(subscriptionId);
        return { message: 'Subscription deleted successfully' };
    }
}
