import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartDto, UpdateCartItemQuantityDto } from "./dto/cart.dto";
import { Auth } from "src/common/decorators/auth.decorator";

@Auth()
@Controller('carts')
export class CartController {
    constructor(private cartService: CartService) { }

    @Get()
    getMyCartItems() {
        return this.cartService.getMyCartItems();
    }

    @Post('add')
    addToCartItem(@Body() body: CartDto) {
        return this.cartService.addToCartItem(body);
    }

    @Post(':id/quantity')
    updateCartItemQuantity(@Param('id') id: number, @Body() body: UpdateCartItemQuantityDto) {
        return this.cartService.updateCartItemQuantity(id, body);
    }

    @Delete(':id')
    deleteToCartItem(@Param('id') id: number) {
        return this.cartService.deleteToCartItem(id);
    }
}