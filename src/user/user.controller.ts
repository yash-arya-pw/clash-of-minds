import {
  Controller,
  Get,
  UseGuards,
  Request,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { User } from './user.schema';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get current user',
    description:
      'Retrieves the profile information of the currently authenticated user.',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        phoneNumber: { type: 'string' },
        course: { type: 'string' },
        trophies: { type: 'number' },
        gold: { type: 'number' },
        elixir: { type: 'number' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing authentication token.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@Request() req): Promise<Omit<User, 'password'>> {
    const user = req.user;
    const { ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }

  @ApiOperation({
    summary: 'Update user profile',
    description: 'Updates the profile information of a specific user.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to update',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User profile updated successfully.',
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        phoneNumber: { type: 'string' },
        course: { type: 'string' },
        trophies: { type: 'number' },
        gold: { type: 'number' },
        elixir: { type: 'number' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing authentication token.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - User not found.',
  })
  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, updateUserDto);
  }
}