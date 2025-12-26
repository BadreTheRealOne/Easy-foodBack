import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // IMPORTANT: Ensure this explicit server.options handler is DELETED or commented out
  // const server = app.getHttpAdapter().getInstance();
  // server.options('/*', (req, res) => { /* ... */ });

  app.enableCors({
    origin: 'https://easy-food-front-tau.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Include all methods your API uses
    allowedHeaders: 'Content-Type, Authorization', // Include all headers your frontend sends
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT || 3000);
}

void bootstrap();
