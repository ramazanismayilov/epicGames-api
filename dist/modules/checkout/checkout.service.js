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
exports.CheckoutService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const Checkout_entity_1 = require("../../entities/Checkout.entity");
const User_entity_1 = require("../../entities/User.entity");
const typeorm_2 = require("typeorm");
const Product_entity_1 = require("../../entities/Product.entity");
const checkout_enum_1 = require("../../common/enums/checkout.enum");
const CheckoutItem_entity_1 = require("../../entities/CheckoutItem.entity");
const CartItem_entity_1 = require("../../entities/CartItem.entity");
let CheckoutService = class CheckoutService {
    constructor(cls, dataSource) {
        this.cls = cls;
        this.dataSource = dataSource;
        this.cartItemRepo = this.dataSource.getRepository(CartItem_entity_1.CartItemEntity);
        this.checkoutRepo = this.dataSource.getRepository(Checkout_entity_1.CheckoutEntity);
        this.checkoutItemRepo = this.dataSource.getRepository(CheckoutItem_entity_1.CheckoutItemEntity);
        this.productRepo = this.dataSource.getRepository(Product_entity_1.ProductEntity);
        this.userRepo = this.dataSource.getRepository(User_entity_1.UserEntity);
    }
    async getAllCheckouts() {
        const checkouts = await this.checkoutRepo.find({
            relations: ['user', 'items', 'items.product', 'items.product.coverImage'],
            select: {
                id: true,
                totalAmount: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    username: true,
                    email: true,
                    balance: true,
                },
                items: {
                    id: true,
                    price: true,
                    product: {
                        id: true,
                        name: true,
                        isFree: true,
                        price: true,
                        discount: true,
                        discountedPrice: true,
                        coverImage: true
                    }
                }
            }
        });
        if (checkouts.length === 0)
            throw new common_1.NotFoundException('Checkouts not found');
        return checkouts;
    }
    async getCheckoutById(checkoutId) {
        const checkout = await this.checkoutRepo.findOne({
            where: { id: checkoutId },
            relations: ['user', 'items', 'items.product', 'items.product.coverImage'],
            select: {
                id: true,
                totalAmount: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    username: true,
                    email: true,
                    balance: true,
                },
                items: {
                    price: true,
                    product: {
                        id: true,
                        name: true,
                        coverImage: true,
                        isFree: true,
                        price: true,
                        discount: true,
                        discountedPrice: true,
                    }
                }
            }
        });
        if (!checkout)
            throw new common_1.NotFoundException('Checkout not found');
        return checkout;
    }
    async getCheckoutsByUser(userId) {
        const checkouts = await this.checkoutRepo.find({
            where: { user: { id: userId } },
            relations: ['user', 'items', 'items.product', 'items.product.coverImage'],
            select: {
                user: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    username: true,
                    email: true,
                    balance: true,
                },
                items: {
                    id: true,
                    price: true,
                    product: {
                        id: true,
                        name: true,
                        isFree: true,
                        price: true,
                        discount: true,
                        discountedPrice: true,
                        coverImage: true
                    }
                }
            }
        });
        if (!checkouts.length)
            throw new common_1.NotFoundException('No checkouts found for this user');
        return checkouts;
    }
    async createCheckout(params) {
        const user = this.cls.get('user');
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const products = await this.productRepo.find({
            where: { id: (0, typeorm_2.In)(params.productIds) },
            select: ['id', 'name', 'coverImage', 'isFree', 'price', 'discount', 'discountedPrice'],
        });
        if (products.length !== params.productIds.length)
            throw new common_1.NotFoundException('Some products not found');
        const checkout = this.checkoutRepo.create({
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                balance: user.balance
            },
            totalAmount: 0,
            status: checkout_enum_1.CheckoutStatus.INPROGRESS,
            items: [],
        });
        let totalAmount = 0;
        const items = [];
        for (const productId of params.productIds) {
            const product = products.find(p => p.id === productId);
            if (!product)
                throw new common_1.NotFoundException(`Product with ID ${productId} not found`);
            product.isTopSeller = product.soldCount >= 50;
            const item = new CheckoutItem_entity_1.CheckoutItemEntity();
            item.product = product;
            item.checkout = checkout;
            item.price = product.discountedPrice;
            totalAmount += item.price;
            items.push(item);
        }
        if (items.length === 0)
            throw new common_1.BadRequestException('No valid products selected for checkout');
        checkout.totalAmount = totalAmount;
        checkout.items = items;
        await this.checkoutRepo.save(checkout);
        return { message: 'Success' };
    }
    async completeCheckout(params) {
        const checkouts = [];
        const failedReasons = [];
        for (const checkoutId of params.checkoutIds) {
            const checkout = await this.checkoutRepo.findOne({
                where: { id: checkoutId },
                relations: ['user', 'items', 'items.product']
            });
            if (!checkout) {
                failedReasons.push('Checkout not found');
                continue;
            }
            if (checkout.status === checkout_enum_1.CheckoutStatus.COMPLETED) {
                failedReasons.push('Checkout already completed');
                continue;
            }
            const user = await this.userRepo.findOneBy({ id: checkout.user.id });
            if (!user) {
                failedReasons.push('User not found');
                continue;
            }
            if (checkout.totalAmount > user.balance) {
                checkout.status = checkout_enum_1.CheckoutStatus.FAILED;
                await this.checkoutRepo.save(checkout);
                failedReasons.push('Balance not enough');
                continue;
            }
            checkouts.push({ checkout, user });
        }
        if (failedReasons.length > 0) {
            throw new common_1.BadRequestException(failedReasons[0]);
        }
        for (const { checkout, user } of checkouts) {
            user.balance -= checkout.totalAmount;
            await this.userRepo.save(user);
            checkout.status = checkout_enum_1.CheckoutStatus.COMPLETED;
            await this.checkoutRepo.save(checkout);
            const productIds = checkout.items.map(item => item.product.id);
            await this.cartItemRepo.delete({
                user: { id: user.id },
                product: (0, typeorm_2.In)(productIds),
            });
        }
        return { message: 'All checkouts completed successfully' };
    }
    async deleteCheckout(checkoutId) {
        const checkout = await this.checkoutRepo.findOne({ where: { id: checkoutId } });
        if (!checkout)
            throw new common_1.NotFoundException('Checkout not found');
        if (checkout.status === checkout_enum_1.CheckoutStatus.COMPLETED)
            throw new common_1.BadRequestException('Completed checkout cannot be deleted');
        await this.checkoutRepo.delete(checkoutId);
        return { message: 'Checkout deleted successfully' };
    }
    async addProductToCheckout(checkoutId, params) {
        const checkout = await this.checkoutRepo.findOne({
            where: { id: checkoutId },
            relations: ['items', 'items.product'],
        });
        if (!checkout)
            throw new common_1.NotFoundException('Checkout not found');
        const product = await this.productRepo.findOne({ where: { id: params.productId } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        const items = [];
        const existingItem = checkout.items.find(i => i.product.id === product.id);
        if (existingItem) {
            existingItem.price = product.discountedPrice;
            await this.checkoutItemRepo.save(existingItem);
        }
        else {
            const productCheckout = new CheckoutItem_entity_1.CheckoutItemEntity();
            productCheckout.product = product;
            productCheckout.checkout = checkout;
            productCheckout.price = product.discountedPrice;
            items.push(productCheckout);
            await this.checkoutItemRepo.save(productCheckout);
        }
        checkout.totalAmount = checkout.items.reduce((sum, i) => sum + i.price, 0);
        await this.checkoutRepo.save(checkout);
        return { message: 'Product added to checkout successfully' };
    }
    async removeProductFromCheckout(checkoutId, checkoutItemId) {
        const checkout = await this.checkoutRepo.findOne({ where: { id: checkoutId }, relations: ['items'] });
        if (!checkout)
            throw new common_1.NotFoundException('Checkout not found');
        const item = checkout.items.find(i => i.id === checkoutItemId);
        if (!item)
            throw new common_1.NotFoundException('Checkout item not found in checkout');
        if (checkout.status === checkout_enum_1.CheckoutStatus.COMPLETED)
            throw new common_1.BadRequestException('Completed checkout cannot be deleted');
        await this.checkoutItemRepo.remove(item);
        const updatedCheckout = await this.checkoutRepo.findOne({ where: { id: checkoutId }, relations: ['items'] });
        if (!updatedCheckout || updatedCheckout.items.length === 0) {
            await this.checkoutRepo.delete(checkoutId);
            return { message: 'Checkout deleted successfully' };
        }
        updatedCheckout.totalAmount = updatedCheckout.items.reduce((sum, i) => sum + i.price, 0);
        await this.checkoutRepo.save(updatedCheckout);
        return { message: 'Product removed from checkout successfully' };
    }
};
exports.CheckoutService = CheckoutService;
exports.CheckoutService = CheckoutService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService,
        typeorm_2.DataSource])
], CheckoutService);
//# sourceMappingURL=checkout.service.js.map