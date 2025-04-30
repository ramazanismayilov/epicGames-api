import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CheckoutService } from "./checkout.service";
import { AddProductToCheckoutDto, CheckoutDto } from "./dto/checkout.dto";
import { Auth } from "src/common/decorators/auth.decorator";

@Auth()
@Controller('checkouts')
export class CheckoutController {
    constructor(private checkoutService: CheckoutService) { }

    @Get()
    getAllCheckouts() {
        return this.checkoutService.getAllCheckouts()
    }

    @Get(':id')
    getCheckoutById(@Param('id') id: number) {
        return this.checkoutService.getCheckoutById(id)
    }

    @Get('user/:id')
    getCheckoutsByUser(@Param('id') id: number) {
        return this.checkoutService.getCheckoutsByUser(id)
    }

    @Post()
    createCheckout(@Body() body: CheckoutDto) {
        return this.checkoutService.createCheckout(body)
    }

    @Post(':id/complete')
    completeCheckout(@Param('id') id: number) {
        return this.checkoutService.completeCheckout(id)
    }

    @Post(':id/cancel')
    cancelCheckout(@Param('id') id: number) {
        return this.checkoutService.cancelCheckout(id)
    }

    @Post(':id/addProduct')
    addProductToCheckout(@Param('id') id: number, @Body() body: AddProductToCheckoutDto) {
        return this.checkoutService.addProductToCheckout(id, body)
    }

    @Post(':checkoutId/removeProduct/:productId')
    removeProductFromCheckout(@Param('checkoutId') checkoutId: number, @Param('productId') productId: number) {
        return this.checkoutService.removeProductFromCheckout(checkoutId, productId);
    }
}
