import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  // Configure CORS with specific options
  app.enableCors({
    origin: true, // Reflects the request origin
    credentials: true, // Required for cookies, authorization headers with HTTPS
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Origin,Accept,Authorization,Content-Type,X-Requested-With',
    exposedHeaders: 'Access-Control-Allow-Origin',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
