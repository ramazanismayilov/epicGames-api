import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CheckoutService } from "./checkout.service";
import { CheckoutDto, CheckoutItemDto, CompleteCheckoutDto } from "./dto/checkout.dto";
import { Auth } from "../../common/decorators/auth.decorator";

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

    @Post('complete')
    completeCheckout(@Body() body: CompleteCheckoutDto) {
        return this.checkoutService.completeCheckout(body)
    }

    @Delete(':id')
    deleteCheckout(@Param('id') id: number) {
        return this.checkoutService.deleteCheckout(id)
    }

    @Post(':id/addProduct')
    addProductToCheckout(@Param('id') id: number, @Body() body: CheckoutItemDto) {
        return this.checkoutService.addProductToCheckout(id, body)
    }

    @Delete(':checkoutId/checkoutItems/:checkoutItemId')
    removeProductFromCheckout(@Param('checkoutId') checkoutId: number, @Param('checkoutItemId') checkoutItemId: number) {
        return this.checkoutService.removeProductFromCheckout(checkoutId, checkoutItemId);
    }
}
