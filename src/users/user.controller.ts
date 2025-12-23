import { Controller, Get, Delete, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me/export')
  exportMe(@Req() req: any) {
    return this.usersService.exportMe(req.user.userId);
  }

  @Delete('me')
  deleteMe(@Req() req: any) {
    return this.usersService.deleteMe(req.user.userId);
  }
}
