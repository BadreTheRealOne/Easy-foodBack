import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateRecipeDto } from 'src/auth/dto/create-recipe.dto';

@Injectable()
export class RecipesService {
  findAll(arg0: number, arg1: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

  create(userId: string, dto: CreateRecipeDto) {
    return this.prisma.recipe.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async findOne(id: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        category: true,
      },
    });

    if (!recipe) throw new NotFoundException('Recipe not found');
    return recipe;
  }

  // ✅ pagination
  async findAllPaginated(page = 1, limit = 10) {
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const safeLimit =
      Number.isFinite(limit) && limit > 0 && limit <= 30 ? limit : 10;

    const skip = (safePage - 1) * safeLimit;

    const [items, total] = await Promise.all([
      this.prisma.recipe.findMany({
        skip,
        take: safeLimit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, name: true } },
          category: true,
        },
      }),
      this.prisma.recipe.count(),
    ]);

    return {
      items,
      meta: {
        total,
        page: safePage,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit),
        hasNext: skip + items.length < total,
      },
    };
  }

  // ✅ delete owner + nettoyage favorites
  async delete(recipeId: string, userId: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
      select: { id: true, userId: true },
    });

    if (!recipe) throw new NotFoundException('Recipe not found');
    if (recipe.userId !== userId) throw new ForbiddenException('Not allowed');

    // IMPORTANT: supprimer favorites liés à la recette
    await this.prisma.favorite.deleteMany({
      where: { recipeId },
    });

    return this.prisma.recipe.delete({
      where: { id: recipeId },
    });
  }
}
