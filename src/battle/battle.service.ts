import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BattleLog, BattleLogDocument } from './battle-log.schema';
import { User, UserDocument } from '../user/user.schema';
import { BattleResultDto } from './dto/battle-result.dto';

@Injectable()
export class BattleService {
  constructor(
    @InjectModel(BattleLog.name) private battleLogModel: Model<BattleLogDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async processBattleResult(battleResult: BattleResultDto) {
    // Create battle log
    const battleLog = new this.battleLogModel(battleResult);
    await battleLog.save();

    if (battleResult.result === 'win') {
      // Update attacker (winner)
      await this.userModel.findByIdAndUpdate(
        battleResult.attackerId,
        {
          $inc: {
            trophies: battleResult.trophies,
            gold: battleResult.gold,
            elixir: battleResult.elixir,
          },
        },
      );

      // Update defender (loser)
      await this.userModel.findByIdAndUpdate(
        battleResult.defenderId,
        {
          $inc: {
            trophies: -battleResult.trophies,
            gold: -battleResult.gold,
            elixir: -battleResult.elixir,
          },
        },
      );
    }

    return battleLog;
  }
} 