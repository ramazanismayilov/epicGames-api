"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const path_1 = require("path");
const jwt_1 = require("@nestjs/jwt");
const serve_static_1 = require("@nestjs/serve-static");
const nestjs_cls_1 = require("nestjs-cls");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const auth_module_1 = require("./modules/auth/auth.module");
const global_module_1 = require("./modules/global/global.module");
const user_module_1 = require("./modules/user/user.module");
const general_module_1 = require("./modules/general/general.module");
const upload_module_1 = require("./modules/upload/upload.module");
const news_module_1 = require("./modules/news/news.module");
const event_module_1 = require("./modules/event/event.module");
const genre_module_1 = require("./modules/genre/genre.module");
const feature_module_1 = require("./modules/feature/feature.module");
const type_module_1 = require("./modules/type/type.module");
const platform_module_1 = require("./modules/platform/platform.module");
const subscription_module_1 = require("./modules/subscription/subscription.module");
const product_module_1 = require("./modules/product/product.module");
const checkout_module_1 = require("./modules/checkout/checkout.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    return {
                        type: 'postgres',
                        url: config.get('DATABASE_URL'),
                        entities: [(0, path_1.join)(__dirname, '/entities/*.entity.{ts,js}')],
                        migrations: [(0, path_1.join)(__dirname, '/migrations/*.{ts,js}')],
                        logging: true,
                        synchronize: true,
                    };
                },
            }),
            jwt_1.JwtModule.registerAsync({
                global: true,
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory(config) {
                    return {
                        secret: config.get('JWT_SECRET'),
                        signOptions: { expiresIn: '1d' },
                    };
                },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            nestjs_cls_1.ClsModule.forRoot({
                global: true,
                middleware: {
                    mount: true,
                    setup: (cls, req) => {
                        cls.set('ip', req.ip);
                    },
                },
            }),
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory(config) {
                    return {
                        transport: {
                            service: 'gmail',
                            host: config.get('SMTP_HOST'),
                            port: config.get('SMTP_PORT'),
                            secure: config.get('SMTP_SECURE'),
                            auth: {
                                user: config.get('SMTP_USER'),
                                pass: config.get('SMTP_PASSWORD'),
                            },
                        },
                        defaults: {
                            from: `"Epic Games" <${config.get('SMTP_FROM')}>`,
                        },
                        template: {
                            dir: (0, path_1.join)(__dirname, '..', 'src', 'templates'),
                            adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                            options: {
                                strict: true,
                            },
                        },
                    };
                },
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            general_module_1.GeneralModule,
            global_module_1.GlobalModule,
            upload_module_1.UploadModule,
            news_module_1.NewsModule,
            event_module_1.EventModule,
            genre_module_1.GenreModule,
            feature_module_1.FeatureModule,
            type_module_1.TypeModule,
            platform_module_1.PlatformModule,
            subscription_module_1.SubscriptionModule,
            product_module_1.ProductModule,
            checkout_module_1.CheckoutModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map