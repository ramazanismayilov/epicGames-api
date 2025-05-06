import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { WishlistService } from "./wishlist.service";
import { Auth } from "../../../common/decorators/auth.decorator";
import { WishlistDto } from "./dto/wishlist.dto";

@Auth()
@Controller('wishlist')
export class WishlistController {
    constructor(private wishlistService: WishlistService) { }

    @Get()
    getUserWishlist() {
        return this.wishlistService.getUserWishlist();
    }

    @Post('toggle')
    toggleUserWishlistItem(@Body() body: WishlistDto) {
        return this.wishlistService.toggleUserWishlistItem(body);
    }

    @Delete(':id')
    removeProductFromWishlist(@Param('id') id: number) {
        return this.wishlistService.removeProductFromWishlist(id);
    }

    @Delete()
    clearWishlist() {
        return this.wishlistService.clearWishlist();
    }
}