import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { User } from './user.schema';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@Request() req): Promise<Omit<User, 'password'>> {
    const user = req.user;
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }
}