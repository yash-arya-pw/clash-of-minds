import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AttackService } from './attack.service';
import { AttackTarget } from './types/attack.types';

@Controller('attack')
export class AttackController {
  constructor(private readonly attackService: AttackService) {}

  @UseGuards(JwtAuthGuard)
  @Get('find-target')
  async findRandomTarget(@Request() req): Promise<AttackTarget> {
    const userId = req.user._id;
    return this.attackService.findRandomTarget(userId.toString());
  }
} 