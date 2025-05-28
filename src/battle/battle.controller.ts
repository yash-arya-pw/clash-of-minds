import { Controller, Post, Body } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleResultDto } from './dto/battle-result.dto';

@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post('result')
  async processBattleResult(@Body() battleResult: BattleResultDto) {
    return this.battleService.processBattleResult(battleResult);
  }
} 