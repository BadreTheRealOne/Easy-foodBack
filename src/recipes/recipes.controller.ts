/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from 'src/auth/dto/create-recipe.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Get()
  findAllRecipes(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.recipesService.findAll(Number(page) || 1, Number(limit) || 10);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const filename = Date.now() + extname(file.originalname);
          cb(null, filename);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // ✅ 5MB MAX
      },
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new Error('Only images allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  create(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateRecipeDto,
  ) {
    return this.recipesService.create(req.user.userId, {
      ...dto,
      imageUrl: file ? `/uploads/${file.filename}` : undefined,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Req() req: any, @Param('id') recipeId: string) {
    return this.recipesService.delete(recipeId, req.user.userId);
  }
}
