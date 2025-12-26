import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Remove the explicit server.options handler.
  // const server = app.getHttpAdapter().getInstance();
  // server.options('/*', (req, res) => { ... }); // <-- DELETE THIS BLOCK

  app.enableCors({
    origin: 'https://easy-food-front-tau.vercel.app', // Your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Include all methods your API uses
    allowedHeaders: 'Content-Type, Authorization', // Include all headers your frontend sends (e.g., Content-Type, Authorization, X-Requested-With)
    credentials: true, // If your frontend sends cookies or expects them
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
