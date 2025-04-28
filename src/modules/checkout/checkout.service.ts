import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { CheckoutEntity } from "src/entities/Checkout.entity";
import { CheckoutItemEntity } from "src/entities/CheckoutItem.entity";
import { UserEntity } from "src/entities/User.entity";
import { DataSource, In, Repository } from "typeorm";
import { CheckoutDto } from "./dto/checkout.dto";
import { ProductEntity } from "src/entities/Product.entity";

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

    async createCheckout(params: CheckoutDto) {
        let user = this.cls.get<UserEntity>('user')
        if (!user) throw new NotFoundException('User not found')

        const productIds = params.items.map(item => item.productId);
        const products = await this.productRepo.find({
            where: { id: In(productIds) },
            select: ['id', 'name', 'price', 'discountedPrice']
        });
        if (products.length !== productIds.length) throw new BadRequestException('Some products not found')

        const checkoutItems: CheckoutItemEntity[] = params.items.map(item => {
            const product = products.find(p => p.id === item.productId);
            if (!product) throw new BadRequestException(`Product with id ${item.productId} not found`);

            const checkoutItem = new CheckoutItemEntity();
            checkoutItem.product = product;
            checkoutItem.quantity = item.quantity;
            checkoutItem.price = product.discountedPrice;

            return checkoutItem;
        });

        const totalAmount = checkoutItems.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        if (user.balance < totalAmount) throw new BadRequestException('Insufficient balance');

        const checkout = new CheckoutEntity();
        checkout.user = user;
        checkout.items = checkoutItems;
        checkout.totalAmount = totalAmount;

        const savedCheckout = await this.checkoutRepo.save(checkout);
        user.balance -= totalAmount;
        await this.userRepo.save(user);

        const checkoutWithItems = await this.checkoutRepo
            .createQueryBuilder('checkout')
            .leftJoinAndSelect('checkout.items', 'item')
            .leftJoinAndSelect('item.product', 'product')
            .select([
                'checkout.id',
                'checkout.totalAmount',
                'checkout.createdAt',
                'checkout.updatedAt',
                'checkout.user',
                'item.id',
                'item.quantity',
                'item.price',
                'product.id',
                'product.name',
                'product.isFree',
                'product.price',
                'product.discount',
                'product.discountedPrice'
            ])
            .where('checkout.id = :id', { id: savedCheckout.id })
            .getOne();
        return { message: 'Checkout successfully created', data: checkoutWithItems };
    }
}