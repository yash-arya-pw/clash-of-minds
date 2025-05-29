import { Model } from 'mongoose';
import { BattleLog, BattleLogDocument } from './battle-log.schema';
import { UserDocument } from '../user/user.schema';
import { BattleResultDto } from './dto/battle-result.dto';
export declare class BattleService {
    private battleLogModel;
    private userModel;
    constructor(battleLogModel: Model<BattleLogDocument>, userModel: Model<UserDocument>);
    processBattleResult(battleResult: BattleResultDto): Promise<import("mongoose").Document<unknown, {}, BattleLogDocument, {}> & BattleLog & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
