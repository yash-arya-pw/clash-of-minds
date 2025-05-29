import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-With',
    ],
    exposedHeaders: ['Access-Control-Allow-Origin'],
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
