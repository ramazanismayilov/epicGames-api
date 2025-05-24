import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoleEntity } from "./Role.entity";
import { CartItemEntity } from "./CartItem.entity";
import { WishlistItemEntity } from "./WishlistItem.entity";
import { CheckoutEntity } from "./Checkout.entity";
import { Provider } from "../common/enums/provider.enum";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column({ unique: true })
    username: string

    @Column({ unique: true })
    email: string

    @Column({ unique: true, nullable: true, type: 'varchar' })
    pendingEmail?: string | null

    @Column()
    password: string

    @Column()
    dateOfBirth: Date

    @Column()
    country: string

    @Column({ type: 'float', default: 0 })
    balance: number

    @Column()
    accountId: string

    @Column({ default: false })
    isVerified: boolean

    @Column({ type: 'int', nullable: true })
    otpCode?: number | null;

    @Column({ type: 'timestamp', nullable: true })
    otpExpiredAt?: Date | null;

    @Column({ type: 'varchar', nullable: true })
    refreshToken: string | null;

    @Column({ type: 'timestamp', nullable: true })
    refreshTokenDate: Date | null;

    @Column({ type: 'enum', enum: Provider, default: Provider.LOCAL })
    provider: Provider;

    @Column({ nullable: true })
    providerId: string;

    @ManyToOne(() => RoleEntity, (role) => role.users, { onDelete: 'SET NULL' })
    role: RoleEntity;

    @OneToMany(() => CartItemEntity, (cartItem) => cartItem.user)
    cartItems: CartItemEntity[];

    @OneToMany(() => WishlistItemEntity, (wishlistItem) => wishlistItem.user)
    wishlistItems: WishlistItemEntity[];

    @OneToMany(() => CheckoutEntity, (checkout) => checkout.user)
    checkouts: CheckoutEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}