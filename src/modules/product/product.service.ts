import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { ProductEntity } from "src/entities/Product.entity";
import { DataSource, In, Repository } from "typeorm";
import { AddProductDto } from "./dto/product.dto";
import { UserEntity } from "src/entities/User.entity";
import { Role } from "src/common/enums/role.enum";
import { MediaEntity } from "src/entities/Media.entity";
import { EventEntity } from "src/entities/Event.entity";
import { GenreEntity } from "src/entities/Genre.entity";
import { FeatureEntity } from "src/entities/Feature.entity";
import { PlatformEntity } from "src/entities/Platform.entity";
import { SubscriptionEntity } from "src/entities/Subscription.entity";

@Injectable()
export class ProductService {
    private productRepo: Repository<ProductEntity>
    private mediaRepo: Repository<MediaEntity>
    private eventRepo: Repository<EventEntity>
    private genreRepo: Repository<GenreEntity>
    private featureRepo: Repository<FeatureEntity>
    private platformRepo: Repository<PlatformEntity>
    private subscriptionRepo: Repository<SubscriptionEntity>

    constructor(
        private cls: ClsService,
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.productRepo = this.dataSource.getRepository(ProductEntity)
        this.mediaRepo = this.dataSource.getRepository(MediaEntity)
        this.eventRepo = this.dataSource.getRepository(EventEntity)
        this.genreRepo = this.dataSource.getRepository(GenreEntity)
        this.featureRepo = this.dataSource.getRepository(FeatureEntity)
        this.platformRepo = this.dataSource.getRepository(PlatformEntity)
        this.subscriptionRepo = this.dataSource.getRepository(SubscriptionEntity)
    }

    async getAllProducts() {
        let product = await this.productRepo.find({
            relations: ['media', 'events', 'genres', 'features', 'platforms', 'subscriptions']
        })
        if (product.length === 0) throw new NotFoundException('Products not found')

        return product
    }

    async getProduct(productId: number) {
        let product = await this.productRepo.findOne({
            where: { id: productId },
            relations: ['media', 'events', 'genres', 'features', 'platforms', 'subscriptions']
        })
        if (!product) throw new NotFoundException('Product not found')

        return product
    }

    async addProduct(params: AddProductDto) {
        const user = this.cls.get<UserEntity>('user');
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to add product')

        const existingProduct = await this.productRepo.findOne({ where: { media: { id: params.mediaId } } })
        if (existingProduct) throw new ConflictException("This media has already been used in another product entry")

        const media = await this.mediaRepo.findOne({ where: { id: params.mediaId } });
        if (!media) throw new NotFoundException("Media not found");

        const events = await this.eventRepo.findBy({ id: In(params.eventsId) });
        if (events.length !== params.eventsId.length) throw new NotFoundException("Some events not found");

        const genres = await this.genreRepo.findBy({ id: In(params.genresId) });
        if (genres.length !== params.genresId.length) throw new NotFoundException("Some genres not found");

        const features = await this.featureRepo.findBy({ id: In(params.featuresId) });
        if (features.length !== params.featuresId.length) throw new NotFoundException("Some features not found");

        const platforms = await this.platformRepo.findBy({ id: In(params.platformsId) });
        if (platforms.length !== params.platformsId.length) throw new NotFoundException("Some platforms not found");

        const subscriptions = await this.subscriptionRepo.findBy({ id: In(params.subscriptionsId) });
        if (subscriptions.length !== params.subscriptionsId.length) throw new NotFoundException("Some subscriptions not found");

        const product = this.productRepo.create({
            ...params,
            media,
            events,
            genres,
            features,
            platforms,
            subscriptions
        });

        await this.productRepo.save(product);

        return { message: 'Product successfully created', product };
    }

    async updateProduct() { }

    async deleteProduct() { }
}