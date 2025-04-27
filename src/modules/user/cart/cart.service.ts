import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { CartItemEntity } from "src/entities/CartItem.entity";
import { ProductEntity } from "src/entities/Product.entity";
import { UserEntity } from "src/entities/User.entity";
import { DataSource, Repository } from "typeorm";
import { CartDto, UpdateCartItemQuantityDto } from "./dto/cart.dto";

@Injectable()
export class CartService {
    private cartRepo: Repository<CartItemEntity>
    private productRepo: Repository<ProductEntity>

    constructor(
        private cls: ClsService,
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.cartRepo = this.dataSource.getRepository(CartItemEntity)
        this.productRepo = this.dataSource.getRepository(ProductEntity)
    }

    async getUserCartItems() {
        const user = this.cls.get<UserEntity>('user');
        if (!user) throw new NotFoundException('User not found');

        const userCart = await this.cartRepo.find({
            where: { user: { id: user.id } },
            relations: ['product', 'user'],
            select: {
                product: {
                    id: true,
                    name: true,
                    description: true,
                    isFree: true,
                    price: true,
                    discount: true,
                    discountedPrice: true
                },
                user: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    username: true,
                    email: true
                }
            }
        });
        if (userCart.length === 0) throw new NotFoundException('Your cart is empty');

        return userCart;
    }

    async addProductToCart(params: CartDto) {
        let user = this.cls.get<UserEntity>('user')
        if (!user) throw new NotFoundException('User not found')

        let product = await this.productRepo.findOne({ where: { id: params.productId } })
        if (!product) throw new NotFoundException('Product not found')

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
                quantity: params.quantity ?? 1,
                totalPrice: product.discountedPrice * (params.quantity ?? 1)
            })
        } else {
            if (params.quantity) {
                cartItem.quantity += params.quantity;
            } else {
                cartItem.quantity += 1;
            }
            cartItem.totalPrice = product.discountedPrice * cartItem.quantity;
        }

        await this.cartRepo.save(cartItem!);
        return { message: 'Product successfully added to your cart', cartItem };
    }

    async updateProductQuantityInCart(cartId: number, params: UpdateCartItemQuantityDto) {
        const user = this.cls.get<UserEntity>('user');
        if (!user) throw new NotFoundException('User not found');

        const cartItem = await this.cartRepo.findOne({
            where: { id: cartId, user: { id: user.id } },
            relations: ['product'],
        });
        if (!cartItem) throw new NotFoundException('Product not found in your cart');

        cartItem.quantity += params.change;

        if (cartItem.quantity <= 0) {
            await this.cartRepo.delete(cartItem.id);
            return { message: 'Product removed from cart because its quantity is zero or less' };
        }

        cartItem.totalPrice = cartItem.product.discountedPrice * cartItem.quantity;
        await this.cartRepo.save(cartItem);

        return { message: 'Product quantity updated successfully in your cart', cartItem };
    }

    async removeProductFromCart(cartId: number) {
        let user = this.cls.get<UserEntity>('user')
        if (!user) throw new NotFoundException('User not found')

        let cartItem = await this.cartRepo.findOne({
            where: { id: cartId, user: { id: user.id } },
            relations: ['user']
        });
        if (!cartItem) throw new NotFoundException('Product not found in your cart')

        await this.cartRepo.remove(cartItem);
        return { message: 'Product removed successfully from your cart' };
    }

    async clearCart() {
        let user = this.cls.get<UserEntity>('user');
        if (!user) throw new NotFoundException('User not found');

        let cartItems = await this.cartRepo.find({
            where: { user: { id: user.id } },
            relations: ['user'],
        });
        if (cartItems.length === 0) throw new NotFoundException('Your cart is empty');

        await this.cartRepo.remove(cartItems);
        return { message: 'Your cart has been cleared successfully' };
    }
}