import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MediaEntity } from "./Media.entity";
import { GenreEntity } from "./Genre.entity";
import { FeatureEntity } from "./Feature.entity";
import { PlatformEntity } from "./Platform.entity";
import { EventEntity } from "./Event.entity";
import { SubscriptionEntity } from "./Subscription.entity";
import { AgeRestriction } from "../common/enums/ageRestriction.enum";
import { TypeEntity } from "./Type.entity";

@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(() => MediaEntity)
    @JoinTable({ name: 'product_media' })
    media: MediaEntity[];

    @Column()
    name: string

    @Column()
    slug: string

    @Column()
    description: string

    @Column({ default: false })
    isFree: boolean

    @Column({ type: 'float' })
    price: number;

    @Column({ type: 'float' })
    discount: number;

    @Column({ type: 'float' })
    discountedPrice: number;

    @Column({ default: false })
    isDiscount: boolean

    @Column({ default: 0 })
    soldCount: number;

    @Column({ default: false })
    isTopSeller: boolean

    @Column()
    developer: string

    @Column()
    publisher: string

    @Column({ default: false })
    isSlider: boolean

    @Column({ type: 'enum', enum: AgeRestriction, default: AgeRestriction.Age3 })
    ageRestriction: AgeRestriction

    @ManyToMany(() => EventEntity, { cascade: true })
    @JoinTable({ name: 'product_event' })
    events: EventEntity[];

    @ManyToMany(() => GenreEntity, { cascade: true })
    @JoinTable({ name: 'product_genre' })
    genres: GenreEntity[];

    @ManyToMany(() => TypeEntity, { cascade: true })
    @JoinTable({ name: 'product_type' })
    types: TypeEntity[];

    @ManyToMany(() => FeatureEntity, { cascade: true })
    @JoinTable({ name: 'product_feature' })
    features: FeatureEntity[];

    @ManyToMany(() => PlatformEntity, { cascade: true })
    @JoinTable({ name: 'product_platform' })
    platforms: PlatformEntity[];

    @ManyToMany(() => SubscriptionEntity, { cascade: true })
    @JoinTable({ name: 'product_subscription' })
    subscriptions: SubscriptionEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}