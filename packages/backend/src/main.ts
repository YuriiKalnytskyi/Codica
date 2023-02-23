import { NestFactory } from '@nestjs/core';import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';import { ValidationPipe } from '@nestjs/common';import { json, urlencoded } from 'express';import { AppModule } from './app.module';async function bootstrap() {  const app = await NestFactory.create(AppModule);  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));  const config = new DocumentBuilder()    .setTitle('Nest + Sequelize')    .setDescription('The nest js API description')    .setVersion('1.0')    .addTag('nest')    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' }, 'JWT')    .build();  const document = SwaggerModule.createDocument(app, config);  SwaggerModule.setup('api', app, document);  app.use(json({ limit: '20mb' }));  app.use(urlencoded({ extended: true, limit: '20mb' }));  const PORT = process.env.PORT || 4200  await app.listen(PORT, ()=> console.log(`Server run to PORT--${PORT}`));}bootstrap();