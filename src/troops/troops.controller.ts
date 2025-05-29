import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { TroopsService, TroopResponse } from './troops.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

interface UpdateTroopQuantityDto {
  quantity: number;
}

@ApiTags('Troops')
@ApiBearerAuth()
@Controller('troops')
export class TroopsController {
  constructor(private readonly troopsService: TroopsService) {}

  @ApiOperation({
    summary: 'Get user troops',
    description: 'Retrieves all troops and their details for a specific user.',
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user whose troops to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'User troops retrieved successfully.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          troopId: { type: 'string' },
          name: { type: 'string' },
          level: { type: 'number' },
          quantity: { type: 'number' },
          maxQuantity: { type: 'number' },
          trainingCost: {
            type: 'object',
            properties: {
              gold: { type: 'number' },
              elixir: { type: 'number' },
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
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getTroopsByUserId(
    @Param('userId') userId: string,
  ): Promise<TroopResponse[]> {
    return this.troopsService.getTroopsByUserId(userId);
  }

  @ApiOperation({
    summary: 'Update troop quantity',
    description: 'Updates the quantity of a specific troop type for a user.',
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user whose troop to update',
  })
  @ApiParam({
    name: 'troopId',
    description: 'The ID of the troop to update',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        quantity: { type: 'number' },
      },
      required: ['quantity'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Troop quantity updated successfully.',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        troop: {
          type: 'object',
          properties: {
            troopId: { type: 'string' },
            quantity: { type: 'number' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid quantity or insufficient resources.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing authentication token.',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':userId/troop/:troopId')
  async updateTroopQuantity(
    @Param('userId') userId: string,
    @Param('troopId') troopId: string,
    @Body() updateDto: UpdateTroopQuantityDto,
  ) {
    return this.troopsService.updateTroopQuantity(
      userId,
      troopId,
      updateDto.quantity,
    );
  }
} 