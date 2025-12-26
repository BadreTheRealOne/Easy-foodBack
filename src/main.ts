import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const server = app.getHttpAdapter().getInstance();

  // ✅ FIX EXPRESS + OPTIONS (IMPORTANT)
  server.options('/*', (req, res) => {
    res.header(
      'Access-Control-Allow-Origin',
      'https://easy-food-front-tau.vercel.app',
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204);
  });

  app.enableCors({
    origin: 'https://easy-food-front-tau.vercel.app',
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
