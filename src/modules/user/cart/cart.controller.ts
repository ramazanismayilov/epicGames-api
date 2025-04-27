import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartDto, UpdateCartItemQuantityDto } from "./dto/cart.dto";
import { Auth } from "src/common/decorators/auth.decorator";

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

    @Post(':id/quantity')
    updateProductQuantityInCart(@Param('id') id: number, @Body() body: UpdateCartItemQuantityDto) {
        return this.cartService.updateProductQuantityInCart(id, body);
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