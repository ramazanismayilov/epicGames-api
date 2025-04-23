import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { ProductEntity } from "src/entities/Product.entity";
import { DataSource, ILike, In, Repository } from "typeorm";
import { AddProductDto, UpdateProductDto } from "./dto/product.dto";
import { UserEntity } from "src/entities/User.entity";
import { Role } from "src/common/enums/role.enum";
import { MediaEntity } from "src/entities/Media.entity";
import { EventEntity } from "src/entities/Event.entity";
import { GenreEntity } from "src/entities/Genre.entity";
import { FeatureEntity } from "src/entities/Feature.entity";
import { PlatformEntity } from "src/entities/Platform.entity";
import { SubscriptionEntity } from "src/entities/Subscription.entity";
import { TypeEntity } from "src/entities/Type.entity";
import { findManyOrFail, findOneOrFail } from "src/common/utils/findEntitie.utils";
import { generateSlug } from "src/common/utils/slug.utils";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Injectable()
export class ProductService {
    private productRepo: Repository<ProductEntity>
    private mediaRepo: Repository<MediaEntity>
    private eventRepo: Repository<EventEntity>
    private genreRepo: Repository<GenreEntity>
    private featureRepo: Repository<FeatureEntity>
    private platformRepo: Repository<PlatformEntity>
    private subscriptionRepo: Repository<SubscriptionEntity>
    private typeRepo: Repository<TypeEntity>

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
        this.typeRepo = this.dataSource.getRepository(TypeEntity)
    }

    async getAllProducts(params: PaginationDto) {
        const { limit = 10, offset = 0 } = params;

        let [products, total] = await this.productRepo.findAndCount({
            relations: ['media', 'events', 'genres', 'types', 'features', 'platforms', 'subscriptions'],
            select: {
                media: {
                    id: true,
                    url: true,
                    type: true,
                },
                events: {
                    id: true,
                    name: true
                },
                genres: {
                    id: true,
                    name: true
                },
                types: {
                    id: true,
                    name: true
                },
                features: {
                    id: true,
                    name: true
                },
                platforms: {
                    id: true,
                    name: true
                },
                subscriptions: {
                    id: true,
                    name: true
                }
            },
            skip: offset,
            take: limit,
        })
        if (products.length === 0) throw new NotFoundException('Products not found')

        return {
            data: products,
            count: total,
            limit,
            offset,
            nextPage: total > offset + limit ? offset + limit : null
        }
    }

    async getProduct(productId: number) {
        let product = await this.productRepo.findOne({
            where: { id: productId },
            relations: ['media', 'events', 'genres', 'types', 'features', 'platforms', 'subscriptions'],
            select: {
                media: {
                    id: true,
                    url: true,
                    type: true,
                },
                events: {
                    id: true,
                    name: true
                },
                genres: {
                    id: true,
                    name: true
                },
                types: {
                    id: true,
                    name: true
                },
                features: {
                    id: true,
                    name: true
                },
                platforms: {
                    id: true,
                    name: true
                },
                subscriptions: {
                    id: true,
                    name: true
                }
            },
        })
        if (!product) throw new NotFoundException('Product not found')

        return product
    }

    async addProduct(params: AddProductDto) {
        const user = this.cls.get<UserEntity>('user');
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to add product')

        const existingProduct = await this.productRepo.findOne({ where: { media: { id: params.mediaId } } })
        if (existingProduct) throw new ConflictException("This media has already been used in another product entry")

        const media = await findOneOrFail(this.mediaRepo, params.mediaId, 'Media');
        const events = await findManyOrFail(this.eventRepo, params.eventsId, 'Events');
        const genres = await findManyOrFail(this.genreRepo, params.genresId, 'Genres');
        const types = await findManyOrFail(this.typeRepo, params.typesId, 'Types');
        const features = await findManyOrFail(this.featureRepo, params.featuresId, 'Features');
        const platforms = await findManyOrFail(this.platformRepo, params.platformsId, 'Platforms');
        const subscriptions = await findManyOrFail(this.subscriptionRepo, params.subscriptionsId, 'Subscriptions');

        let slug: string = generateSlug(params.name)

        let discountedPrice: number = params.price;
        if (typeof params.discount === 'number' && params.discount > 0) discountedPrice = params.price - (params.price * params.discount) / 100;

        const product = this.productRepo.create({
            ...params,
            slug,
            discountedPrice: Math.round(discountedPrice * 10) / 10,
            media,
            events,
            genres,
            types,
            features,
            platforms,
            subscriptions
        });

        await this.productRepo.save(product);

        return { message: 'Product successfully created', product };
    }

    async updateProduct(productId: number, params: UpdateProductDto) {
        const user = this.cls.get<UserEntity>('user');
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to update product')

        let product = await this.productRepo.findOne({
            where: { id: productId },
            relations: ['events', 'genres', 'types', 'features', 'platforms', 'subscriptions']
        })
        if (!product) throw new NotFoundException('Product not found')

        if (params.name) {
            const slug: string = generateSlug(params.name);
            product.slug = slug;
        }

        if (params.mediaId) {
            const existingProduct = await this.productRepo.findOne({ where: { media: { id: params.mediaId } } });
            if (existingProduct && existingProduct.id !== productId) throw new ConflictException('This media has already been used in another product entry');

            const media = await this.mediaRepo.findOne({ where: { id: params.mediaId } })
            if (!media) throw new NotFoundException('Media not found')
            product.media = media
        }

        if (params.eventsId?.length) {
            const events = await this.eventRepo.findBy({ id: In(params.eventsId) })
            if (events.length !== params.eventsId.length) throw new NotFoundException('Some events not found')
            product.events = events
        }

        if (params.genresId?.length) {
            const genres = await this.genreRepo.findBy({ id: In(params.genresId) })
            if (genres.length !== params.genresId.length) throw new NotFoundException('Some genres not found')
            product.genres = genres
        }

        if (params.typesId?.length) {
            const types = await this.typeRepo.findBy({ id: In(params.typesId) })
            if (types.length !== params.typesId.length) throw new NotFoundException('Some types not found')
            product.types = types
        }

        if (params.featuresId?.length) {
            const features = await this.featureRepo.findBy({ id: In(params.featuresId) })
            if (features.length !== params.featuresId.length) throw new NotFoundException('Some features not found')
            product.features = features
        }

        if (params.platformsId?.length) {
            const platforms = await this.platformRepo.findBy({ id: In(params.platformsId) })
            if (platforms.length !== params.platformsId.length) throw new NotFoundException('Some platforms not found')
            product.platforms = platforms
        }

        if (params.subscriptionsId?.length) {
            const subscriptions = await this.subscriptionRepo.findBy({ id: In(params.subscriptionsId) })
            if (subscriptions.length !== params.subscriptionsId.length) throw new NotFoundException('Some subscriptions not found')
            product.subscriptions = subscriptions
        }

        Object.assign(product, {
            name: params.name ?? product.name,
            description: params.description ?? product.description,
            price: params.price ?? product.price
        });

        return await this.productRepo.save(product);
    }

    async deleteProduct(productId: number) {
        const user = this.cls.get<UserEntity>('user');
        if (user.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission to delete product')

        let product = await this.productRepo.findOne({
            where: { id: productId },
            relations: ['events', 'genres', 'types', 'features', 'platforms', 'subscriptions']
        })
        if (!product) throw new NotFoundException('Product not found')

        await this.productRepo.save(product);
        await this.productRepo.delete(productId)
        return { message: 'Product deleted successfully' }

    }
}