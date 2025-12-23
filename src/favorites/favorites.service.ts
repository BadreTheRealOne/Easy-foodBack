import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  add(userId: string, recipeId: string) {
    return this.prisma.favorite.create({
      data: {
        userId,
        recipeId,
      },
    });
  }

  remove(userId: string, recipeId: string) {
    return this.prisma.favorite.delete({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    });
  }

  findMine(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: {
        recipe: {
          include: {
            category: true,
          },
        },
      },
    });
  }
}
