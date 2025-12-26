import {
  Controller,
  Post,
  Req,
  Get,
  UseGuards,
  Body,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { CreateRecipeDto } from 'src/auth/dto/create-recipe.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  // ✅ PUBLIC : liste paginée
  @Get()
  findAllRecipes(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.recipesService.findAll(Number(page) || 1, Number(limit) || 10);
  }

  // ✅ PUBLIC : détail
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }

  // 🔒 PROTÉGÉ : créer
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: any, @Body() dto: CreateRecipeDto) {
    return this.recipesService.create(req.user.userId, dto);
  }

  // 🔒 PROTÉGÉ : supprimer (seulement si owner)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Req() req: any, @Param('id') recipeId: string) {
    return this.recipesService.delete(recipeId, req.user.userId);
  }
}
