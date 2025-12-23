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
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.recipesService.findAllPaginated(Number(page), Number(limit));
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
