"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const Product_entity_1 = require("../../../entities/Product.entity");
const WishlistItem_entity_1 = require("../../../entities/WishlistItem.entity");
const typeorm_2 = require("typeorm");
let WishlistService = class WishlistService {
    constructor(cls, dataSource) {
        this.cls = cls;
        this.dataSource = dataSource;
        this.wishlistRepo = this.dataSource.getRepository(WishlistItem_entity_1.WishlistItemEntity);
        this.productRepo = this.dataSource.getRepository(Product_entity_1.ProductEntity);
    }
    async getUserWishlist() {
        const user = this.cls.get('user');
        if (!user)
            throw new common_1.NotFoundException('User not found');
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
        if (userWishlist.length === 0)
            throw new common_1.NotFoundException('Your wishlist is empty');
        return { data: userWishlist };
    }
    async toggleUserWishlistItem(params) {
        let user = this.cls.get('user');
        if (!user)
            throw new common_1.NotFoundException('User not found');
        let product = await this.productRepo.findOne({ where: { id: params.productId } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
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
            });
            await this.wishlistRepo.save(wishlistItem);
            return { message: 'Product successfully added to your wishlist' };
        }
        else {
            await this.wishlistRepo.delete(wishlistItem.id);
            return { message: 'Product successfully removed from your wishlist' };
        }
    }
    async removeProductFromWishlist(wishlistItemId) {
        let user = this.cls.get('user');
        if (!user)
            throw new common_1.NotFoundException('User not found');
        let wishlistItem = await this.wishlistRepo.findOne({
            where: { id: wishlistItemId, user: { id: user.id } },
            relations: ['user']
        });
        if (!wishlistItem)
            throw new common_1.NotFoundException('Wishlist item not found');
        await this.wishlistRepo.remove(wishlistItem);
        return { message: 'Product successfully removed from your wishlist' };
    }
    async clearWishlist() {
        let user = this.cls.get('user');
        if (!user)
            throw new common_1.NotFoundException('User not found');
        let wishlistItems = await this.wishlistRepo.find({
            where: { user: { id: user.id } },
            relations: ['user'],
        });
        if (wishlistItems.length === 0)
            throw new common_1.NotFoundException('Your wishlist is empty');
        await this.wishlistRepo.remove(wishlistItems);
        return { message: 'All items have been successfully removed from your wishlist' };
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService,
        typeorm_2.DataSource])
], WishlistService);
//# sourceMappingURL=wishlist.service.js.map