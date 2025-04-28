import { Body, Controller, Post } from "@nestjs/common";
import { CheckoutService } from "./checkout.service";
import { CheckoutDto } from "./dto/checkout.dto";
import { Auth } from "src/common/decorators/auth.decorator";

@Auth()
@Controller('checkouts')
export class CheckoutController {
    constructor(private checkoutService: CheckoutService) { }

    @Post()
    createCheckout(@Body() body: CheckoutDto) {
        return this.checkoutService.createCheckout(body)
    }
}