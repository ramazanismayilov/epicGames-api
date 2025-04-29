import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { CheckoutEntity } from "src/entities/Checkout.entity";
import { UserEntity } from "src/entities/User.entity";
import { DataSource, In, Repository } from "typeorm";
import { CheckoutDto } from "./dto/checkout.dto";
import { ProductEntity } from "src/entities/Product.entity";
import { CheckoutStatus } from "src/common/enums/checkout.enum";

@Injectable()
export class CheckoutService {
    private checkoutRepo: Repository<CheckoutEntity>
    private productRepo: Repository<ProductEntity>
    private userRepo: Repository<UserEntity>

    constructor(
        private cls: ClsService,
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.checkoutRepo = this.dataSource.getRepository(CheckoutEntity)
        this.productRepo = this.dataSource.getRepository(ProductEntity)
        this.userRepo = this.dataSource.getRepository(UserEntity)
    }

    async getAllCheckouts() {
        const checkouts = await this.checkoutRepo.find({
            relations: ['user', 'products'],
            select: {
                user: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    username: true,
                    email: true,
                    balance: true,
                },
                products: {
                    id: true,
                    name: true,
                    isFree: true,
                    price: true,
                    discount: true,
                    discountedPrice: true
                }
            }
        });
        if (checkouts.length === 0) throw new NotFoundException('Checkouts not found')

        return checkouts;
    }

    async getCheckoutById(checkoutId: number) {
        const checkout = await this.checkoutRepo.find({
            where: { id: checkoutId },
            relations: ['user', 'products'],
            select: {
                user: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    username: true,
                    email: true,
                    balance: true,
                },
                products: {
                    id: true,
                    name: true,
                    isFree: true,
                    price: true,
                    discount: true,
                    discountedPrice: true
                }
            }
        });
        if (checkout.length === 0) throw new NotFoundException('Checkout not found')

        return checkout;
    }

    async getCheckoutsByUser() {
        let user = this.cls.get<UserEntity>('user')
        if (!user) throw new NotFoundException('User not found')

        const checkouts = await this.checkoutRepo.find({
            where: { user: { id: user.id } },
            relations: ['user', 'products'],
            select: {
                user: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    username: true,
                    email: true,
                    balance: true,
                },
                products: {
                    id: true,
                    name: true,
                    isFree: true,
                    price: true,
                    discount: true,
                    discountedPrice: true
                }
            }
        });
        if (!checkouts.length) throw new NotFoundException('No checkouts found for this user');
        return checkouts;
    }

    async createCheckout(params: CheckoutDto) {
        let user = this.cls.get<UserEntity>('user')
        if (!user) throw new NotFoundException('User not found')

        let products = await this.productRepo.find({
            where: { id: In(params.productIds) },
            select: ['id', 'name', 'isFree', 'price', 'discount', 'discountedPrice'],
        })
        if (products.length !== params.productIds.length) throw new NotFoundException('Some products not found')

        const totalAmount = products.reduce((sum, product) => sum + product.discountedPrice, 0)

        const checkout = this.checkoutRepo.create({
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                balance: user.balance
            },
            products,
            totalAmount,
            status: CheckoutStatus.INPROGRESS
        });

        await this.checkoutRepo.save(checkout);
        return { message: 'Checkout created successfully', checkout };
    }

    async completeCheckout(checkoutId: number) {
        const checkout = await this.checkoutRepo.findOne({
            where: { id: checkoutId },
            relations: ['user', 'products']
        });

        if (!checkout) throw new NotFoundException('Checkout not found');
        if (checkout.status === CheckoutStatus.CANCELED) throw new BadRequestException('Checkout has already been canceled')
        if (checkout.status === CheckoutStatus.COMPLETED) throw new BadRequestException('Checkout has already been completed')

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
        return { message: 'Checkout completed successfully', checkout };
    }

    async cancelCheckout(checkoutId: number) {
        const checkout = await this.checkoutRepo.findOne({ where: { id: checkoutId } });
        if (!checkout) throw new NotFoundException('Checkout not found');

        if (checkout.status === CheckoutStatus.COMPLETED) throw new BadRequestException('Completed checkout cannot be canceled');

        checkout.status = CheckoutStatus.CANCELED;
        await this.checkoutRepo.save(checkout);
        return { message: 'Checkout canceled successfully' };
    }
}