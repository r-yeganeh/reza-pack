import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoModule } from './mongo.module';
import { setupSwagger } from '../swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS for development (optional)
  app.enableCors();
  // await app.select(MongoModule).create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove unknown properties from request payload
      forbidNonWhitelisted: true, // Throw an error if unknown properties are present
    }),
  ); // use class-validator with Nest.js validation pipe
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
