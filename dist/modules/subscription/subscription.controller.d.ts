import { SubscriptionService } from "./subscription.service";
import { AddSubscriptionDto, UpdateSubscriptionDto } from "./dto/subscription.dto";
export declare class SubscriptionController {
    private subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    getAllSubscriptions(): Promise<import("../../entities/Subscription.entity").SubscriptionEntity[]>;
    addSubscription(body: AddSubscriptionDto): Promise<{
        message: string;
        subscription: import("../../entities/Subscription.entity").SubscriptionEntity;
    }>;
    updateSubscription(id: number, body: UpdateSubscriptionDto): Promise<{
        message: string;
        subscription: import("../../entities/Subscription.entity").SubscriptionEntity;
    }>;
    deleteSubscription(id: number): Promise<{
        message: string;
    }>;
}
