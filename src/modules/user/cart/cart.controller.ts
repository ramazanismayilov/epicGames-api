import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CartService } from "./cart.service";
import { Auth } from "../../../common/decorators/auth.decorator";
import { CartDto } from "./dto/cart.dto";

@Auth()
@Controller('carts')
export class CartController {
    constructor(private cartService: CartService) { }

    @Get()
    getUserCartItems() {
        return this.cartService.getUserCartItems();
    }

    @Post('add')
    addProductToCart(@Body() body: CartDto) {
        return this.cartService.addProductToCart(body);
    }

    @Delete(':id')
    removeProductFromCart (@Param('id') id: number) {
        return this.cartService.removeProductFromCart(id);
    }

    @Delete()
    clearCart() {
        return this.cartService.clearCart();
    }
}