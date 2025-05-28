import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
   // put your actual frontend URL here
    'http://localhost:3000',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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
