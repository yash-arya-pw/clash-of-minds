import { BattleService } from './battle.service';
import { BattleResultDto } from './dto/battle-result.dto';
export declare class BattleController {
    private readonly battleService;
    constructor(battleService: BattleService);
    processBattleResult(battleResult: BattleResultDto): Promise<import("mongoose").Document<unknown, {}, import("./battle-log.schema").BattleLogDocument, {}> & import("./battle-log.schema").BattleLog & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
