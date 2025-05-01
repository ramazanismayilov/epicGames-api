import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { CheckoutEntity } from "src/entities/Checkout.entity";
import { UserEntity } from "src/entities/User.entity";
import { DataSource, In, Repository } from "typeorm";
import { AddProductToCheckoutDto, CheckoutDto } from "./dto/checkout.dto";
import { ProductEntity } from "src/entities/Product.entity";
import { CheckoutStatus } from "src/common/enums/checkout.enum";
import { CheckoutItemEntity } from "src/entities/CheckoutItem.entity";
import { classToPlain } from "class-transformer";

@Injectable()
export class CheckoutService {
    private checkoutRepo: Repository<CheckoutEntity>
    private checkoutItemRepo: Repository<CheckoutItemEntity>
    private productRepo: Repository<ProductEntity>
    private userRepo: Repository<UserEntity>

    constructor(
        private cls: ClsService,
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.checkoutRepo = this.dataSource.getRepository(CheckoutEntity)
        this.checkoutItemRepo = this.dataSource.getRepository(CheckoutItemEntity)
        this.productRepo = this.dataSource.getRepository(ProductEntity)
        this.userRepo = this.dataSource.getRepository(UserEntity)
    }

    async getAllCheckouts() {
        const checkouts = await this.checkoutRepo.find({
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
                    quantity: true,
                    price: true,
                    product: {
                        id: true,
                        name: true,
                        media: true,
                        isFree: true,
                        price: true,
                        discount: true,
                        discountedPrice: true,
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
                    quantity: true,
                    price: true,
                    product: {
                        id: true,
                        name: true,
                        media: true,
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
            relations: ['user', 'items', 'items.product'],
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
                    quantity: true,
                    price: true,
                    product: {
                        id: true,
                        name: true,
                        media: true,
                        isFree: true,
                        price: true,
                        discount: true,
                        discountedPrice: true
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
            where: { id: In(params.items.map(item => item.productId)) },
            select: ['id', 'name', 'media', 'isFree', 'price', 'discount', 'discountedPrice'],
        });

        if (products.length !== params.items.length) throw new NotFoundException('Some products not found');

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

        for (const checkoutItem of params.items) {
            const product = products.find(p => p.id === checkoutItem.productId);
            const quantity = checkoutItem.quantity ?? 1;

            if (!product) throw new NotFoundException(`Product with ID ${checkoutItem.productId} not found`);
            if (quantity === 0) continue;

            const item = new CheckoutItemEntity();
            item.product = product;
            item.checkout = checkout;
            item.quantity = quantity;
            item.price = product.discountedPrice * quantity;
            totalAmount += item.price;
            items.push(item);
        }

        if (items.length === 0) throw new BadRequestException('No valid products selected for checkout');

        checkout.totalAmount = totalAmount;
        checkout.items = items;

        await this.checkoutRepo.save(checkout);
        return { message: 'Checkout created successfully', checkout: classToPlain(checkout) };
    }

    async completeCheckout(checkoutId: number) {
        const checkout = await this.checkoutRepo.findOne({ where: { id: checkoutId }, relations: ['user', 'items', 'items.product'] });

        if (!checkout) throw new NotFoundException('Checkout not found');
        if (checkout.status === CheckoutStatus.COMPLETED) throw new BadRequestException('Checkout has already been completed');

        const user = await this.userRepo.findOneBy({ id: checkout.user.id });
        if (!user) throw new NotFoundException('User not found');

        if (checkout.totalAmount > user.balance) {
            checkout.status = CheckoutStatus.FAILED;
            await this.checkoutRepo.save(checkout);
            throw new BadRequestException('Your balance is not enough');
        }

        user.balance -= checkout.totalAmount;
        await this.userRepo.save(user);

        checkout.status = CheckoutStatus.COMPLETED;
        await this.checkoutRepo.save(checkout);
        return { message: 'Checkout completed successfully' };
    }

    async deleteCheckout(checkoutId: number) {
        const checkout = await this.checkoutRepo.findOne({ where: { id: checkoutId } });

        if (!checkout) throw new NotFoundException('Checkout not found');
        if (checkout.status === CheckoutStatus.COMPLETED) throw new BadRequestException('Completed checkout cannot be deleted');

        await this.checkoutRepo.delete(checkoutId)
        return { message: 'Checkout deleted successfully' };
    }

    async addProductToCheckout(checkoutId: number, params: AddProductToCheckoutDto) {
        const checkout = await this.checkoutRepo.findOne({
            where: { id: checkoutId },
            relations: ['items', 'items.product'],
        });
        if (!checkout) throw new NotFoundException('Checkout not found');
    
        const product = await this.productRepo.findOne({ where: { id: params.productId } });
        if (!product) throw new NotFoundException('Product not found');
    
        const quantityToAdd = params.quantity ?? 1;
    
        const items: CheckoutItemEntity[] = [];

        const existingItem = checkout.items.find(i => i.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantityToAdd;
            existingItem.price = product.discountedPrice * existingItem.quantity;
            await this.checkoutItemRepo.save(existingItem);
        } else {
            const productCheckout = new CheckoutItemEntity();
            productCheckout.product = product;
            productCheckout.checkout = checkout; 
            productCheckout.quantity = quantityToAdd;
            productCheckout.price = product.discountedPrice * quantityToAdd;
            items.push(productCheckout)
            await this.checkoutItemRepo.save(productCheckout);
        }
    
        checkout.totalAmount = checkout.items.reduce((sum, i) => sum + i.price, 0);
        await this.checkoutRepo.save(checkout);
    
        return { message: 'Product added to checkout successfully'};
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