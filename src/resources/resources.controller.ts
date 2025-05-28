import { Controller, Get, Param, UseGuards } from '@nestjs/common';
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
} 