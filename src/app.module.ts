import { Module } from '@nestjs/common';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
