import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

let cachedApp: any = null;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.enableCors();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    const config = new DocumentBuilder()
      .setTitle('Epic Games')
      .setDescription('The Epic Games API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);

    // 🚀 Swagger-i kökdə ("/") aç
    SwaggerModule.setup('/', app, documentFactory, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });

    await app.init(); // listen yoxdur, Vercel üçün init
    cachedApp = app;
  }

  return cachedApp;
}

export default async function handler(req, res) {
  const app = await bootstrap();
  const server = app.getHttpAdapter().getInstance();
  return server(req, res);
}
