import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  ingredients: string;

  @IsString()
  steps: string;

  @IsUUID()
  categoryId: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
