import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BattleController } from './battle.controller';
import { BattleService } from './battle.service';
import { BattleLog, BattleLogSchema } from './battle-log.schema';
import { User, UserSchema } from '../user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BattleLog.name, schema: BattleLogSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [BattleController],
  providers: [BattleService],
})
export class BattleModule { }