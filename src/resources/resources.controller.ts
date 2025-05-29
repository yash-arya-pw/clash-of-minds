import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ResourcesService } from './resources.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

interface ResourceData {
  _id: string;
  assetId: string;
  index: number[];
  imageURL: string;
  level: number;
  health: number;
}

interface ResourcePosition {
  resourceId: string;
  newIndex: number[];
}

interface UpdatePositionsDto {
  positions: ResourcePosition[];
}

interface UpgradeResourceDto {
  assetId: string;
}

@ApiTags('Resources')
@ApiBearerAuth()
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @ApiOperation({
    summary: 'Get user resources',
    description: 'Retrieves all resources and their details for a specific user.',
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user whose resources to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'User resources retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        base: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              assetId: { type: 'string' },
              index: {
                type: 'array',
                items: { type: 'number' },
              },
              imageURL: { type: 'string' },
              level: { type: 'number' },
              health: { type: 'number' },
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
  async getResourcesByUserId(
    @Param('userId') userId: string,
  ): Promise<{ base: ResourceData[] }> {
    return this.resourcesService.getResourcesByUserId(userId);
  }

  @ApiOperation({
    summary: 'Update resource positions',
    description:
      "Updates the positions of multiple resources in the user's base.",
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user whose resources to update',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        positions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              resourceId: { type: 'string' },
              newIndex: {
                type: 'array',
                items: { type: 'number' },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Resource positions updated successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid position data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing authentication token.',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':userId/positions')
  async updateResourcePositions(
    @Param('userId') userId: string,
    @Body() updateDto: UpdatePositionsDto,
  ) {
    return this.resourcesService.updateResourcePositions({
      userId,
      positions: updateDto.positions,
    });
  }

  @ApiOperation({
    summary: 'Upgrade resource',
    description: 'Upgrades a specific resource to the next level.',
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user whose resource to upgrade',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        assetId: { type: 'string' },
      },
      required: ['assetId'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Resource upgraded successfully.',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        resource: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            assetId: { type: 'string' },
            level: { type: 'number' },
            health: { type: 'number' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid upgrade request or insufficient resources.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing authentication token.',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':userId/upgrade')
  async upgradeResource(
    @Param('userId') userId: string,
    @Body() upgradeDto: UpgradeResourceDto,
  ) {
    return this.resourcesService.upgradeResource(userId, upgradeDto.assetId);
  }
} 