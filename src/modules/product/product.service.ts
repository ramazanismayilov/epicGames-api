import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { ProductEntity } from "../../entities/Product.entity";
import { DataSource, In, Repository } from "typeorm";
import { AddProductDto, UpdateProductDto } from "./dto/product.dto";
import { UserEntity } from "../../entities/User.entity";
import { Role } from "../../common/enums/role.enum";
import { MediaEntity } from "../../entities/Media.entity";
import { EventEntity } from "../../entities/Event.entity";
import { GenreEntity } from "../../entities/Genre.entity";
import { FeatureEntity } from "../../entities/Feature.entity";
import { PlatformEntity } from "../../entities/Platform.entity";
import { SubscriptionEntity } from "../../entities/Subscription.entity";
import { TypeEntity } from "../../entities/Type.entity";
import { generateSlug } from "../../common/utils/slug.utils";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { validatePriceAndDiscount } from "../../common/utils/validateFreeProduct.utils";
import { calculateDiscountedPrice } from "../../common/utils/calculateDiscountPrice.utils";
import { findEntitiesByIds } from "../../common/utils/findEntitie.utils";

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

    async getAllProducts(paginationDto: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;

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

        const existingProduct = await this.productRepo.findOne({ where: { media: { id: In(params.mediaId) } } })
        if (existingProduct) throw new ConflictException("This media has already been used in another product entry")

        const media = await findEntitiesByIds(this.mediaRepo, params.mediaId, 'media');
        const events = await findEntitiesByIds(this.eventRepo, params.eventsId, 'events');
        const genres = await findEntitiesByIds(this.genreRepo, params.genresId, 'genres');
        const types = await findEntitiesByIds(this.typeRepo, params.typesId, 'types');
        const features = await findEntitiesByIds(this.featureRepo, params.featuresId, 'features');
        const platforms = await findEntitiesByIds(this.platformRepo, params.platformsId, 'platforms');
        const subscriptions = await findEntitiesByIds(this.subscriptionRepo, params.subscriptionsId, 'subscriptions');

        let slug: string = generateSlug(params.name)
        let discountedPrice = calculateDiscountedPrice(params.price, params.discount)
        validatePriceAndDiscount(params.isFree, params.price, params.discount)

        const product = this.productRepo.create({
            ...params,
            slug,
            discountedPrice,
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
            const existingProduct = await this.productRepo.findOne({ where: { media: { id: In(params.mediaId) } } })
            if (existingProduct) throw new ConflictException("This media has already been used in another product entry")

            const media = await findEntitiesByIds(this.mediaRepo, params.mediaId, 'media');
            product.media = media
        }

        if (params.eventsId?.length) {
            const events = await findEntitiesByIds(this.eventRepo, params.eventsId, 'event');
            product.events = events
        }

        if (params.genresId?.length) {
            const genres = await findEntitiesByIds(this.genreRepo, params.genresId, 'genre');
            product.genres = genres
        }

        if (params.typesId?.length) {
            const types = await findEntitiesByIds(this.typeRepo, params.typesId, 'type');
            product.types = types
        }

        if (params.featuresId?.length) {
            const features = await findEntitiesByIds(this.featureRepo, params.featuresId, 'feature');
            product.features = features
        }

        if (params.platformsId?.length) {
            const platforms = await findEntitiesByIds(this.platformRepo, params.platformsId, 'platform');
            product.platforms = platforms
        }

        if (params.subscriptionsId?.length) {
            const subscriptions = await findEntitiesByIds(this.subscriptionRepo, params.subscriptionsId, 'subscription');
            product.subscriptions = subscriptions
        }

        if (params.isFree !== undefined) {
            validatePriceAndDiscount(params.isFree, params.price, params.discount);
            product.isFree = params.isFree;
        }

        const name = params.name ?? product.name
        const description = params.description ?? product.description
        const price = params.isFree ? 0 : params.price !== undefined && params.price >= 0 ? params.price : product.price;
        const discount = params.isFree ? 0 : params.discount !== undefined && params.discount >= 0 ? params.discount : product.discount;
        const discountedPrice = Math.round(calculateDiscountedPrice(price, discount) * 10) / 10;

        Object.assign(product, {
            name,
            description,
            price,
            discount,
            discountedPrice,
        });

        let updatedProduct = await this.productRepo.save(product)
        return { message: "Product updated successfully", updatedProduct }
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