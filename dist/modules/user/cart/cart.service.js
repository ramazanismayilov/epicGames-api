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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const CartItem_entity_1 = require("../../../entities/CartItem.entity");
const Product_entity_1 = require("../../../entities/Product.entity");
const typeorm_2 = require("typeorm");
let CartService = class CartService {
    constructor(cls, dataSource) {
        this.cls = cls;
        this.dataSource = dataSource;
        this.cartRepo = this.dataSource.getRepository(CartItem_entity_1.CartItemEntity);
        this.productRepo = this.dataSource.getRepository(Product_entity_1.ProductEntity);
    }
    async getUserCartItems() {
        const user = this.cls.get('user');
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const userCart = await this.cartRepo.find({
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
        if (userCart.length === 0)
            throw new common_1.NotFoundException('Your cart is empty');
        return { data: userCart };
    }
    async addProductToCart(params) {
        let user = this.cls.get('user');
        if (!user)
            throw new common_1.NotFoundException('User not found');
        let product = await this.productRepo.findOne({ where: { id: params.productId } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        let cartItem = await this.cartRepo.findOne({
            where: {
                user: { id: user.id },
                product: { id: params.productId },
            },
            relations: ['product']
        });
        if (!cartItem) {
            cartItem = this.cartRepo.create({
                user,
                product,
                totalPrice: product.discountedPrice
            });
        }
        else {
            throw new common_1.ConflictException('This product has already in cart');
        }
        await this.cartRepo.save(cartItem);
        return { message: 'Success' };
    }
    async removeProductFromCart(cartId) {
        let user = this.cls.get('user');
        if (!user)
            throw new common_1.NotFoundException('User not found');
        let cartItem = await this.cartRepo.findOne({
            where: { id: cartId, user: { id: user.id } },
            relations: ['user']
        });
        if (!cartItem)
            throw new common_1.NotFoundException('Product not found in your cart');
        await this.cartRepo.remove(cartItem);
        return { message: 'Product removed successfully from your cart' };
    }
    async clearCart() {
        let user = this.cls.get('user');
        if (!user)
            throw new common_1.NotFoundException('User not found');
        let cartItems = await this.cartRepo.find({
            where: { user: { id: user.id } },
            relations: ['user'],
        });
        if (cartItems.length === 0)
            throw new common_1.NotFoundException('Your cart is empty');
        await this.cartRepo.remove(cartItems);
        return { message: 'Your cart has been cleared successfully' };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService,
        typeorm_2.DataSource])
], CartService);
//# sourceMappingURL=cart.service.js.map