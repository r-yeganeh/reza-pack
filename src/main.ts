import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoModule } from './mongo.module';
import { setupSwagger } from '../swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS for development (optional)
  app.enableCors();
  // await app.select(MongoModule).create(AppModule);
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
