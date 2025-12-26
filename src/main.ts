// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 CORS GLOBAL – VERSION ROBUSTE
  app.enableCors({
    origin: 'https://easy-food-front-tau.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  // 🔥 RÉPONSE MANUELLE AU PREFLIGHT (LE POINT CLÉ)
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Origin',
        'https://easy-food-front-tau.vercel.app',
      );
      res.header(
        'Access-Control-Allow-Methods',
        'GET,HEAD,PUT,PATCH,POST,DELETE',
      );
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      return res.sendStatus(204);
    }
    next();
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
