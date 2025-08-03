import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { ProductEntity } from "../../../entities/Product.entity";
import { UserEntity } from "../../../entities/User.entity";
import { WishlistItemEntity } from "../../../entities/WishlistItem.entity";
import { DataSource, Repository } from "typeorm";
import { WishlistDto } from "./dto/wishlist.dto";

@Injectable()
export class WishlistService {
    private wishlistRepo: Repository<WishlistItemEntity>
    private productRepo: Repository<ProductEntity>

    constructor(
        private cls: ClsService,
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.wishlistRepo = this.dataSource.getRepository(WishlistItemEntity)
        this.productRepo = this.dataSource.getRepository(ProductEntity)
    }

    async getUserWishlist() {
        const user = this.cls.get<UserEntity>('user');
        if (!user) throw new NotFoundException('User not found');

        const userWishlist = await this.wishlistRepo.find({
            where: { user: { id: user.id } },
            relations: ['product', 'product.coverImage'],
            select: {
                product: {
                    id: true,
                    name: true,
                    description: true,
                    isFree: true,
                    price: true,
                    discount: true,
                    discountedPrice: true,
                    coverImage: true
                }
            }
        });
        if (userWishlist.length === 0) throw new NotFoundException('Your wishlist is empty');

        return { data: userWishlist };
    }

    async toggleUserWishlistItem(params: WishlistDto) {
        let user = this.cls.get<UserEntity>('user')
        if (!user) throw new NotFoundException('User not found')

        let product = await this.productRepo.findOne({ where: { id: params.productId } })
        if (!product) throw new NotFoundException('Product not found')

        let wishlistItem = await this.wishlistRepo.findOne({
            where: {
                user: { id: user.id },
                product: { id: params.productId },
            }
        });

        if (!wishlistItem) {
            wishlistItem = this.wishlistRepo.create({
                user,
                product,
            })
            await this.wishlistRepo.save(wishlistItem);
            return { message: 'Product successfully added to your wishlist' };
        } else {
            await this.wishlistRepo.delete(wishlistItem.id);
            return { message: 'Product successfully removed from your wishlist' };
        }
    }

    async removeProductFromWishlist(wishlistItemId: number) {
        let user = this.cls.get<UserEntity>('user')
        if (!user) throw new NotFoundException('User not found')

        let wishlistItem = await this.wishlistRepo.findOne({
            where: { id: wishlistItemId, user: { id: user.id } },
            relations: ['user']
        });
        if (!wishlistItem) throw new NotFoundException('Wishlist item not found')

        await this.wishlistRepo.remove(wishlistItem);
        return { message: 'Product successfully removed from your wishlist' };
    }

    async clearWishlist() {
        let user = this.cls.get<UserEntity>('user');
        if (!user) throw new NotFoundException('User not found');

        let wishlistItems = await this.wishlistRepo.find({
            where: { user: { id: user.id } },
            relations: ['user'],
        });
        if (wishlistItems.length === 0) throw new NotFoundException('Your wishlist is empty');

        await this.wishlistRepo.remove(wishlistItems);
        return { message: 'All items have been successfully removed from your wishlist' };
    }
}