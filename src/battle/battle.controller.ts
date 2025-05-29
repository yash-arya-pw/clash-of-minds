import { Controller, Post, Body } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleResultDto } from './dto/battle-result.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Battle')
@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @ApiOperation({
    summary: 'Process battle result',
    description:
      'Processes the outcome of a battle between two players, updating their resources and statistics.',
  })
  @ApiBody({ type: BattleResultDto })
  @ApiResponse({
    status: 200,
    description: 'Battle result processed successfully.',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        rewards: {
          type: 'object',
          properties: {
            gold: { type: 'number' },
            elixir: { type: 'number' },
            trophies: { type: 'number' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid battle result data.',
  })
  @Post('result')
  async processBattleResult(@Body() battleResult: BattleResultDto) {
    return this.battleService.processBattleResult(battleResult);
  }
}