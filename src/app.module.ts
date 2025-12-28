import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { RecipesModule } from './recipes/recipes.module';
import { FavoritesModule } from './favorites/favorite.module';
import { UsersModule } from './users/user.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    RecipesModule,
    FavoritesModule,
    UsersModule,
    CategoriesModule,

    // Sert automatiquement: http://localhost:3000/uploads/xxxx.jpg
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
