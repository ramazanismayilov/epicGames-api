import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MediaEntity } from "./Media.entity";
import { GenreEntity } from "./Genre.entity";
import { FeatureEntity } from "./Feature.entity";
import { PlatformEntity } from "./Platform.entity";
import { EventEntity } from "./Event.entity";
import { SubscriptionEntity } from "./Subscription.entity";
import { AgeRestriction } from "src/common/enums/ratingAge.enum";

@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => MediaEntity, { onDelete: 'SET NULL' })
    @JoinColumn({
        name: 'mediaId',
        referencedColumnName: 'id',
    })
    media: MediaEntity;    

    @Column()
    name: string

    @Column()
    description: string

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;
    
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    discount: number;
    
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    discountedPrice: number;

    @Column()
    developer: string

    @Column()
    publisher: string

    @Column({ type: 'enum',enum: AgeRestriction, default: AgeRestriction.Age3 })
    ageRestriction: AgeRestriction

    @ManyToMany(() => EventEntity, { onDelete: 'SET NULL' })
    @JoinTable()
    events: EventEntity[];
    
    @ManyToMany(() => GenreEntity, { onDelete: 'SET NULL' })
    @JoinTable()
    genres: GenreEntity[];
    
    @ManyToMany(() => FeatureEntity, { onDelete: 'SET NULL' })
    @JoinTable()
    features: FeatureEntity[];
    
    @ManyToMany(() => PlatformEntity, { onDelete: 'SET NULL' })
    @JoinTable()
    platforms: PlatformEntity[];
    
    @ManyToMany(() => SubscriptionEntity, { onDelete: 'SET NULL' })
    @JoinTable()
    subscriptions: SubscriptionEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}