import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3000);

  app.use(json());
  app.enableCors({
    origin: '*',
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    exposedHeaders: ['resource-id'],
  });
}
bootstrap();
