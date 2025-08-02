import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { CheckoutEntity } from "../../entities/Checkout.entity";
import { UserEntity } from "../../entities/User.entity";
import { DataSource, In, Repository } from "typeorm";
import { CheckoutDto, CheckoutItemDto, CompleteCheckoutDto } from "./dto/checkout.dto";
import { ProductEntity } from "../../entities/Product.entity";
import { CheckoutStatus } from "../../common/enums/checkout.enum";
import { CheckoutItemEntity } from "../../entities/CheckoutItem.entity";
import { CartItemEntity } from "src/entities/CartItem.entity";

@Injectable()
export class CheckoutService {
    private cartItemRepo: Repository<CartItemEntity>
    private checkoutRepo: Repository<CheckoutEntity>
    private checkoutItemRepo: Repository<CheckoutItemEntity>
    private productRepo: Repository<ProductEntity>
    private userRepo: Repository<UserEntity>

    constructor(
        private cls: ClsService,
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.cartItemRepo = this.dataSource.getRepository(CartItemEntity)
        this.checkoutRepo = this.dataSource.getRepository(CheckoutEntity)
        this.checkoutItemRepo = this.dataSource.getRepository(CheckoutItemEntity)
        this.productRepo = this.dataSource.getRepository(ProductEntity)
        this.userRepo = this.dataSource.getRepository(UserEntity)
    }

    async getAllCheckouts() {
        const checkouts = await this.checkoutRepo.find({
            relations: ['user', 'items', 'items.product', 'items.product.media'],
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
                        detailImage: {
                            id: true,
                            url: true,
                            type: true
                        },
                        coverImage: {
                            id: true,
                            url: true,
                            type: true,
                        },
                        productLogo: {
                            id: true,
                            url: true,
                            type: true,
                        },
                    }
                }
            }
        });
        if (checkouts.length === 0) throw new NotFoundException('Checkouts not found');

        return checkouts;
    }

    async getCheckoutById(checkoutId: number) {
        const checkout = await this.checkoutRepo.findOne({
            where: { id: checkoutId },
            relations: ['user', 'items', 'items.product'],
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
                        detailImage: true,
                        coverImage: true,
                        productLogo: true,
                        isFree: true,
                        price: true,
                        discount: true,
                        discountedPrice: true,
                    }
                }
            }
        });
        if (!checkout) throw new NotFoundException('Checkout not found');

        return checkout;
    }

    async getCheckoutsByUser(userId: number) {
        const checkouts = await this.checkoutRepo.find({
            where: { user: { id: userId } },
            relations: ['user', 'items', 'items.product', 'items.product.media'],
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
                        detailImage: {
                            id: true,
                            url: true,
                            type: true
                        },
                        coverImage: {
                            id: true,
                            url: true,
                            type: true,
                        },
                        productLogo: {
                            id: true,
                            url: true,
                            type: true,
                        },
                    }
                }
            }
        });
        if (!checkouts.length) throw new NotFoundException('No checkouts found for this user')

        return checkouts;
    }

    async createCheckout(params: CheckoutDto) {
        const user = this.cls.get<UserEntity>('user');
        if (!user) throw new NotFoundException('User not found');

        const products = await this.productRepo.find({
            where: { id: In(params.productIds) },
            select: ['id', 'name', 'detailImage', 'isFree', 'price', 'discount', 'discountedPrice'],
        });

        if (products.length !== params.productIds.length) throw new NotFoundException('Some products not found');

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
            status: CheckoutStatus.INPROGRESS,
            items: [],
        });

        let totalAmount = 0;
        const items: CheckoutItemEntity[] = [];

        for (const productId of params.productIds) {
            const product = products.find(p => p.id === productId);

            if (!product) throw new NotFoundException(`Product with ID ${productId} not found`);

            product.isTopSeller = product.soldCount >= 50;

            const item = new CheckoutItemEntity();
            item.product = product;
            item.checkout = checkout;
            item.price = product.discountedPrice;
            totalAmount += item.price;
            items.push(item);
        }

        if (items.length === 0) throw new BadRequestException('No valid products selected for checkout');

        checkout.totalAmount = totalAmount;
        checkout.items = items;

        await this.checkoutRepo.save(checkout);
        return { message: 'Success' };
    }

    async completeCheckout(params: CompleteCheckoutDto) {
        const checkouts: { checkout: CheckoutEntity; user: UserEntity }[] = [];
        const failedReasons: string[] = [];

        for (const checkoutId of params.checkoutIds) {
            const checkout = await this.checkoutRepo.findOne({
                where: { id: checkoutId },
                relations: ['user', 'items', 'items.product']
            });

            if (!checkout) {
                failedReasons.push('Checkout not found');
                continue;
            }

            if (checkout.status === CheckoutStatus.COMPLETED) {
                failedReasons.push('Checkout already completed');
                continue;
            }

            const user = await this.userRepo.findOneBy({ id: checkout.user.id });
            if (!user) {
                failedReasons.push('User not found');
                continue;
            }

            if (checkout.totalAmount > user.balance) {
                checkout.status = CheckoutStatus.FAILED;
                await this.checkoutRepo.save(checkout);
                failedReasons.push('Balance not enough');
                continue;
            }

            checkouts.push({ checkout, user });
        }

        if (failedReasons.length > 0) {
            throw new BadRequestException(failedReasons[0]);
        }

        for (const { checkout, user } of checkouts) {
            user.balance -= checkout.totalAmount;
            await this.userRepo.save(user);

            checkout.status = CheckoutStatus.COMPLETED;
            await this.checkoutRepo.save(checkout);

            const productIds = checkout.items.map(item => item.product.id);

            await this.cartItemRepo.delete({
                user: { id: user.id },
                product: In(productIds),
            });
        }

        return { message: 'All checkouts completed successfully' };
    }

    async deleteCheckout(checkoutId: number) {
        const checkout = await this.checkoutRepo.findOne({ where: { id: checkoutId } });

        if (!checkout) throw new NotFoundException('Checkout not found');
        if (checkout.status === CheckoutStatus.COMPLETED) throw new BadRequestException('Completed checkout cannot be deleted');

        await this.checkoutRepo.delete(checkoutId)
        return { message: 'Checkout deleted successfully' };
    }

    async addProductToCheckout(checkoutId: number, params: CheckoutItemDto) {
        const checkout = await this.checkoutRepo.findOne({
            where: { id: checkoutId },
            relations: ['items', 'items.product'],
        });
        if (!checkout) throw new NotFoundException('Checkout not found');

        const product = await this.productRepo.findOne({ where: { id: params.productId } });
        if (!product) throw new NotFoundException('Product not found');


        const items: CheckoutItemEntity[] = [];

        const existingItem = checkout.items.find(i => i.product.id === product.id);
        if (existingItem) {
            existingItem.price = product.discountedPrice;
            await this.checkoutItemRepo.save(existingItem);
        } else {
            const productCheckout = new CheckoutItemEntity();
            productCheckout.product = product;
            productCheckout.checkout = checkout;
            productCheckout.price = product.discountedPrice;
            items.push(productCheckout)
            await this.checkoutItemRepo.save(productCheckout);
        }

        checkout.totalAmount = checkout.items.reduce((sum, i) => sum + i.price, 0);
        await this.checkoutRepo.save(checkout);

        return { message: 'Product added to checkout successfully' };
    }

    async removeProductFromCheckout(checkoutId: number, checkoutItemId: number) {
        const checkout = await this.checkoutRepo.findOne({ where: { id: checkoutId }, relations: ['items'] })
        if (!checkout) throw new NotFoundException('Checkout not found')

        const item = checkout.items.find(i => i.id === checkoutItemId)
        if (!item) throw new NotFoundException('Checkout item not found in checkout')

        await this.checkoutItemRepo.remove(item)

        const updatedCheckout = await this.checkoutRepo.findOne({ where: { id: checkoutId }, relations: ['items'] })

        if (!updatedCheckout || updatedCheckout.items.length === 0) {
            await this.checkoutRepo.delete(checkoutId)
            return { message: 'Checkout deleted successfully' }
        }

        updatedCheckout.totalAmount = updatedCheckout.items.reduce((sum, i) => sum + i.price, 0)
        await this.checkoutRepo.save(updatedCheckout)
        return { message: 'Product removed from checkout successfully' }
    }
}