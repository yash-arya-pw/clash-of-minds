import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AttackService } from './attack.service';
import { AttackTarget } from './types/attack.types';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Attack')
@ApiBearerAuth()
@Controller('attack')
export class AttackController {
  constructor(private readonly attackService: AttackService) {}

  @ApiOperation({
    summary: 'Find a random target to attack',
    description:
      'Returns a random player that can be attacked by the authenticated user. The target will have their base layout and resources information.',
  })
  @ApiResponse({
    status: 200,
    description: 'Random target found successfully.',
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        resources: {
          type: 'object',
          properties: {
            gold: { type: 'number' },
            elixir: { type: 'number' },
          },
        },
        baseLayout: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              position: {
                type: 'array',
                items: { type: 'number' },
              },
              type: { type: 'string' },
              level: { type: 'number' },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing authentication token.',
  })
  @ApiResponse({ status: 404, description: 'No valid targets found.' })
  @UseGuards(JwtAuthGuard)
  @Get('find-target')
  async findRandomTarget(@Request() req): Promise<AttackTarget> {
    const userId = req.user._id;
    return this.attackService.findRandomTarget(userId.toString());
  }
} 