import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  ingredients: string;

  @IsString()
  steps: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsUUID()
  categoryId: string;
}
