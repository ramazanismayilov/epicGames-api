import { ClsService } from "nestjs-cls";
import { DataSource } from "typeorm";
import { SubscriptionEntity } from "../../entities/Subscription.entity";
import { AddSubscriptionDto, UpdateSubscriptionDto } from "./dto/subscription.dto";
export declare class SubscriptionService {
    private cls;
    private dataSource;
    private subscriptionRepo;
    constructor(cls: ClsService, dataSource: DataSource);
    getAllSubscriptions(): Promise<SubscriptionEntity[]>;
    addSubscription(params: AddSubscriptionDto): Promise<{
        message: string;
        subscription: SubscriptionEntity;
    }>;
    updateSubscription(subscriptionId: number, params: UpdateSubscriptionDto): Promise<{
        message: string;
        subscription: SubscriptionEntity;
    }>;
    deleteSubscription(subscriptionId: number): Promise<{
        message: string;
    }>;
}
