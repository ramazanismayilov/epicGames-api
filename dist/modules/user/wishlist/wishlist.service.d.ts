import { ClsService } from "nestjs-cls";
import { WishlistItemEntity } from "../../../entities/WishlistItem.entity";
import { DataSource } from "typeorm";
import { WishlistDto } from "./dto/wishlist.dto";
export declare class WishlistService {
    private cls;
    private dataSource;
    private wishlistRepo;
    private productRepo;
    constructor(cls: ClsService, dataSource: DataSource);
    getUserWishlist(): Promise<{
        data: WishlistItemEntity[];
    }>;
    toggleUserWishlistItem(params: WishlistDto): Promise<{
        message: string;
    }>;
    removeProductFromWishlist(wishlistItemId: number): Promise<{
        message: string;
    }>;
    clearWishlist(): Promise<{
        message: string;
    }>;
}
