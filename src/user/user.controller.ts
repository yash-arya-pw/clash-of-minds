import { Controller, Get, UseGuards, Request, Patch, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { User } from './user.schema';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@Request() req): Promise<Omit<User, 'password'>> {
    const user = req.user;
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUser(userId, updateUserDto);
  }
}