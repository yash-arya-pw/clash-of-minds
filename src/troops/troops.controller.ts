import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { TroopsService, TroopResponse } from './troops.service';

interface UpdateTroopQuantityDto {
  quantity: number;
}

@Controller('troops')
export class TroopsController {
  constructor(private readonly troopsService: TroopsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getTroopsByUserId(
    @Param('userId') userId: string,
  ): Promise<TroopResponse[]> {
    return this.troopsService.getTroopsByUserId(userId);
  }

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