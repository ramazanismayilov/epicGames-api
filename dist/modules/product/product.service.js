"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const Product_entity_1 = require("../../entities/Product.entity");
const typeorm_2 = require("typeorm");
const role_enum_1 = require("../../common/enums/role.enum");
const Media_entity_1 = require("../../entities/Media.entity");
const Event_entity_1 = require("../../entities/Event.entity");
const Genre_entity_1 = require("../../entities/Genre.entity");
const Feature_entity_1 = require("../../entities/Feature.entity");
const Platform_entity_1 = require("../../entities/Platform.entity");
const Subscription_entity_1 = require("../../entities/Subscription.entity");
const Type_entity_1 = require("../../entities/Type.entity");
const slug_utils_1 = require("../../common/utils/slug.utils");
const validateFreeProduct_utils_1 = require("../../common/utils/validateFreeProduct.utils");
const calculateDiscountPrice_utils_1 = require("../../common/utils/calculateDiscountPrice.utils");
const findEntitie_utils_1 = require("../../common/utils/findEntitie.utils");
let ProductService = class ProductService {
    constructor(cls, dataSource) {
        this.cls = cls;
        this.dataSource = dataSource;
        this.productRepo = this.dataSource.getRepository(Product_entity_1.ProductEntity);
        this.mediaRepo = this.dataSource.getRepository(Media_entity_1.MediaEntity);
        this.eventRepo = this.dataSource.getRepository(Event_entity_1.EventEntity);
        this.genreRepo = this.dataSource.getRepository(Genre_entity_1.GenreEntity);
        this.featureRepo = this.dataSource.getRepository(Feature_entity_1.FeatureEntity);
        this.platformRepo = this.dataSource.getRepository(Platform_entity_1.PlatformEntity);
        this.subscriptionRepo = this.dataSource.getRepository(Subscription_entity_1.SubscriptionEntity);
        this.typeRepo = this.dataSource.getRepository(Type_entity_1.TypeEntity);
    }
    async getAllProducts(query) {
        const { limit = 10, page = 1, search, isDiscount, isFree, isTopSeller, sortBy = 'createdAt', order = 'DESC', eventId, genreId, typeId, featureId, platformId, subscriptionId } = query;
        const offset = (page - 1) * limit;
        if (offset < 0)
            throw new common_1.BadRequestException('Offset cannot be negative');
        const where = {};
        if (search)
            where.name = (0, typeorm_2.ILike)(`%${search}%`);
        if (isDiscount === true)
            where.isDiscount = true;
        if (isFree === true) {
            where.isFree = true;
        }
        else if (isFree === false) {
            where.isFree = false;
        }
        if (isTopSeller === true)
            where.isTopSeller = true;
        if (eventId?.length)
            where.events = { id: (0, typeorm_2.In)(eventId) };
        if (genreId?.length)
            where.genres = { id: (0, typeorm_2.In)(genreId) };
        if (typeId?.length)
            where.types = { id: (0, typeorm_2.In)(typeId) };
        if (featureId?.length)
            where.features = { id: (0, typeorm_2.In)(featureId) };
        if (platformId?.length)
            where.platforms = { id: (0, typeorm_2.In)(platformId) };
        if (subscriptionId?.length)
            where.subscriptions = { id: (0, typeorm_2.In)(subscriptionId) };
        let [products, total] = await this.productRepo.findAndCount({
            where,
            relations: ['detailImage', 'coverImage', 'productLogo', 'events', 'genres', 'types', 'features', 'platforms', 'subscriptions'],
            select: {
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
            order: {
                isPin: 'DESC',
                [sortBy]: order,
            },
            skip: offset,
            take: limit,
        });
        if (products.length === 0)
            throw new common_1.NotFoundException('Products not found');
        return {
            data: products,
            count: total,
            limit,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getProduct(productId) {
        let product = await this.productRepo.findOne({
            where: { id: productId },
            relations: ['detailImage', 'coverImage', 'productLogo', 'events', 'genres', 'types', 'features', 'platforms', 'subscriptions'],
            select: {
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
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async addProduct(params) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to add product');
        const existingProduct = await this.productRepo.findOne({ where: { detailImage: { id: (0, typeorm_2.In)(params.detailImageId) } } });
        if (existingProduct)
            throw new common_1.ConflictException("This media has already been used in another product entry");
        const detailImage = await (0, findEntitie_utils_1.findEntitiesByIds)(this.mediaRepo, params.detailImageId, 'detail image');
        const events = await (0, findEntitie_utils_1.findEntitiesByIds)(this.eventRepo, params.eventsId, 'events');
        const genres = await (0, findEntitie_utils_1.findEntitiesByIds)(this.genreRepo, params.genresId, 'genres');
        const types = await (0, findEntitie_utils_1.findEntitiesByIds)(this.typeRepo, params.typesId, 'types');
        const features = await (0, findEntitie_utils_1.findEntitiesByIds)(this.featureRepo, params.featuresId, 'features');
        const platforms = await (0, findEntitie_utils_1.findEntitiesByIds)(this.platformRepo, params.platformsId, 'platforms');
        const subscriptions = await (0, findEntitie_utils_1.findEntitiesByIds)(this.subscriptionRepo, params.subscriptionsId, 'subscriptions');
        let slug = (0, slug_utils_1.generateSlug)(params.name);
        let discountedPrice = (0, calculateDiscountPrice_utils_1.calculateDiscountedPrice)(params.price, params.discount);
        (0, validateFreeProduct_utils_1.validatePriceAndDiscount)(params.isFree, params.price, params.discount);
        const isDiscount = params.discount && params.discount > 0 ? true : false;
        let coverImage = null;
        if (params.coverImageId) {
            coverImage = await this.mediaRepo.findOneBy({ id: params.coverImageId });
            if (!coverImage)
                throw new common_1.NotFoundException('Cover image not found');
        }
        let productLogo = null;
        if (params.productLogoId) {
            productLogo = await this.mediaRepo.findOneBy({ id: params.productLogoId });
            if (!productLogo)
                throw new common_1.NotFoundException('Product logo not found');
        }
        if (params.isPin) {
            const pinnedCount = await this.productRepo.count({ where: { isPin: true } });
            if (pinnedCount >= 4)
                throw new common_1.BadRequestException('Maximum 4 products can be pinned.');
        }
        const product = this.productRepo.create({
            ...params,
            slug,
            discountedPrice,
            isDiscount,
            detailImage,
            coverImage,
            productLogo,
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
    async updateProduct(productId, params) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to update product');
        let product = await this.productRepo.findOne({
            where: { id: productId },
            relations: ['detailImage', 'coverImage', 'productLogo', 'events', 'genres', 'types', 'features', 'platforms', 'subscriptions']
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        if (params.name) {
            const slug = (0, slug_utils_1.generateSlug)(params.name);
            product.slug = slug;
        }
        if (params.detailImageId) {
            const existingProduct = await this.productRepo.findOne({ where: { detailImage: { id: (0, typeorm_2.In)(params.detailImageId) }, id: (0, typeorm_2.Not)(product.id) } });
            if (existingProduct)
                throw new common_1.ConflictException("This detailImage has already been used in another product entry");
            const media = await (0, findEntitie_utils_1.findEntitiesByIds)(this.mediaRepo, params.detailImageId, 'media');
            product.detailImage = media;
        }
        if (params.coverImageId) {
            const existingProduct = await this.productRepo.findOne({ where: { coverImage: { id: params.coverImageId }, id: (0, typeorm_2.Not)(product.id) } });
            if (existingProduct)
                throw new common_1.ConflictException("This coverImage has already been used in another product entry");
            const media = await this.mediaRepo.findOneBy({ id: params.coverImageId });
            if (!media)
                throw new common_1.NotFoundException("Cover image not found");
            product.coverImage = media;
        }
        if (params.productLogoId) {
            const existingProduct = await this.productRepo.findOne({ where: { productLogo: { id: params.productLogoId }, id: (0, typeorm_2.Not)(product.id) } });
            if (existingProduct)
                throw new common_1.ConflictException("This productLogo has already been used in another product entry");
            const media = await this.mediaRepo.findOneBy({ id: params.productLogoId });
            if (!media)
                throw new common_1.NotFoundException("Product logo not found");
            product.productLogo = media;
        }
        if (params.eventsId?.length) {
            const events = await (0, findEntitie_utils_1.findEntitiesByIds)(this.eventRepo, params.eventsId, 'event');
            product.events = events;
        }
        if (params.genresId?.length) {
            const genres = await (0, findEntitie_utils_1.findEntitiesByIds)(this.genreRepo, params.genresId, 'genre');
            product.genres = genres;
        }
        if (params.typesId?.length) {
            const types = await (0, findEntitie_utils_1.findEntitiesByIds)(this.typeRepo, params.typesId, 'type');
            product.types = types;
        }
        if (params.featuresId?.length) {
            const features = await (0, findEntitie_utils_1.findEntitiesByIds)(this.featureRepo, params.featuresId, 'feature');
            product.features = features;
        }
        if (params.platformsId?.length) {
            const platforms = await (0, findEntitie_utils_1.findEntitiesByIds)(this.platformRepo, params.platformsId, 'platform');
            product.platforms = platforms;
        }
        if (params.subscriptionsId?.length) {
            const subscriptions = await (0, findEntitie_utils_1.findEntitiesByIds)(this.subscriptionRepo, params.subscriptionsId, 'subscription');
            product.subscriptions = subscriptions;
        }
        if (params.isFree !== undefined) {
            (0, validateFreeProduct_utils_1.validatePriceAndDiscount)(params.isFree, params.price, params.discount);
            product.isFree = params.isFree;
        }
        if (params.isPin !== undefined) {
            if (params.isPin) {
                const pinnedCount = await this.productRepo.count({ where: { isPin: true } });
                if (pinnedCount >= 4)
                    throw new common_1.BadRequestException('Maximum 4 products can be pinned.');
            }
            product.isPin = params.isPin;
        }
        const name = params.name ?? product.name;
        const description = params.description ?? product.description;
        const price = params.isFree ? 0 : params.price !== undefined && params.price >= 0 ? params.price : product.price;
        const discount = params.isFree ? 0 : params.discount !== undefined && params.discount >= 0 ? params.discount : product.discount;
        const discountedPrice = Math.round((0, calculateDiscountPrice_utils_1.calculateDiscountedPrice)(price, discount) * 10) / 10;
        Object.assign(product, {
            name,
            description,
            price,
            discount,
            discountedPrice,
        });
        let updatedProduct = await this.productRepo.save(product);
        return { message: "Product updated successfully", updatedProduct };
    }
    async deleteProduct(productId) {
        const user = this.cls.get('user');
        if (user.role.name !== role_enum_1.Role.ADMIN)
            throw new common_1.ForbiddenException('You do not have permission to delete product');
        let product = await this.productRepo.findOne({
            where: { id: productId },
            relations: ['events', 'genres', 'types', 'features', 'platforms', 'subscriptions']
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        await this.productRepo.save(product);
        await this.productRepo.delete(productId);
        return { message: 'Product deleted successfully' };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService,
        typeorm_2.DataSource])
], ProductService);
//# sourceMappingURL=product.service.js.map