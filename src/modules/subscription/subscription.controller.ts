import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Auth } from "src/common/decorators/auth.decorator";
import { SubscriptionService } from "./subscription.service";
import { AddSubscriptionDto, UpdateSubscriptionDto } from "./dto/subscription.dto";

@Controller('subscriptions')
export class SubscriptionController {
    constructor(private subscriptionService: SubscriptionService) { }

    @Get()
    getAllSubscriptions() {
        return this.subscriptionService.getAllSubscriptions();
    }

    @Post()
    @Auth()
    addSubscription(@Body() body: AddSubscriptionDto) {
        return this.subscriptionService.addSubscription(body);
    }

    @Post(':id')
    @Auth()
    updateSubscription(@Param('id') id: number, @Body() body: UpdateSubscriptionDto) {
        return this.subscriptionService.updateSubscription(id, body);
    }

    @Delete(':id')
    @Auth()
    deleteSubscription(@Param('id') id: number) {
        return this.subscriptionService.deleteSubscription(id);
    }
}
