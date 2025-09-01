import { WishlistService } from "./wishlist.service";
import { WishlistDto } from "./dto/wishlist.dto";
export declare class WishlistController {
    private wishlistService;
    constructor(wishlistService: WishlistService);
    getUserWishlist(): Promise<{
        data: import("../../../entities/WishlistItem.entity").WishlistItemEntity[];
    }>;
    toggleUserWishlistItem(body: WishlistDto): Promise<{
        message: string;
    }>;
    removeProductFromWishlist(id: number): Promise<{
        message: string;
    }>;
    clearWishlist(): Promise<{
        message: string;
    }>;
}
