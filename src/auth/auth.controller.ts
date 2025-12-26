import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Options,
  HttpCode,
} from '@nestjs/common'; // <-- Import Options and HttpCode
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Options('login') // <--- ADD THIS EXPLICIT OPTIONS HANDLER
  @HttpCode(204) // Preflight requests should return 204 No Content
  handleOptionsLogin() {
    // This handler will ensure a 204 is sent for OPTIONS /auth/login
    // The CORS headers from app.enableCors will still be applied.
    return; // No content needed for preflight success
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) {
    return req.user;
  }
}
