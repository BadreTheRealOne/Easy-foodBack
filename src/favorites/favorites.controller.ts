import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FavoritesService } from './favorites.service';

@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post(':recipeId')
  add(@Req() req: any, @Param('recipeId') recipeId: string) {
    return this.favoritesService.add(req.user.userId, recipeId);
  }

  @Delete(':recipeId')
  remove(@Req() req: any, @Param('recipeId') recipeId: string) {
    return this.favoritesService.remove(req.user.userId, recipeId);
  }

  @Get()
  findMine(@Req() req: any) {
    return this.favoritesService.findMine(req.user.userId);
  }
}
