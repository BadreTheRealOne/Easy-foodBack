import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async exportMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        recipes: true,
        favorites: {
          include: { recipe: true },
        },
      },
    });

    return user;
  }

  async deleteMe(userId: string) {
    // 1️⃣ Récupérer les recettes créées par l'utilisateur
    const recipes = await this.prisma.recipe.findMany({
      where: { userId },
      select: { id: true },
    });

    const recipeIds = recipes.map((r) => r.id);

    // 2️⃣ Supprimer TOUS les favoris liés à ces recettes (même d'autres users)
    if (recipeIds.length > 0) {
      await this.prisma.favorite.deleteMany({
        where: {
          recipeId: { in: recipeIds },
        },
      });
    }

    // 3️⃣ Supprimer les recettes de l'utilisateur
    await this.prisma.recipe.deleteMany({
      where: { userId },
    });

    // 4️⃣ Supprimer les favoris de l'utilisateur
    await this.prisma.favorite.deleteMany({
      where: { userId },
    });

    // 5️⃣ Supprimer l'utilisateur
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
