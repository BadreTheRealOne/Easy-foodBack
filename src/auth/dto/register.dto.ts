import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
  IsBoolean,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter and one number',
  })
  password: string;

  @IsString()
  name: string;

  @IsBoolean()
  consent_rgpd: boolean;
}
