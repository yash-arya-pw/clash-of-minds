import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ResourcesService } from './resources.service';

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

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getResourcesByUserId(
    @Param('userId') userId: string,
  ): Promise<{ base: ResourceData[] }> {
    return this.resourcesService.getResourcesByUserId(userId);
  }

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

  @UseGuards(JwtAuthGuard)
  @Put(':userId/upgrade')
  async upgradeResource(
    @Param('userId') userId: string,
    @Body() upgradeDto: UpgradeResourceDto,
  ) {
    return this.resourcesService.upgradeResource(userId, upgradeDto.assetId);
  }
} 