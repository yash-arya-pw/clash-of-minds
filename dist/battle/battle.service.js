"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const battle_log_schema_1 = require("./battle-log.schema");
const user_schema_1 = require("../user/user.schema");
let BattleService = class BattleService {
    constructor(battleLogModel, userModel) {
        this.battleLogModel = battleLogModel;
        this.userModel = userModel;
    }
    async processBattleResult(battleResult) {
        const battleLog = new this.battleLogModel(battleResult);
        await battleLog.save();
        if (battleResult.result === 'win') {
            await this.userModel.findByIdAndUpdate(battleResult.attackerId, {
                $inc: {
                    trophies: battleResult.trophies,
                    gold: battleResult.gold,
                    elixir: battleResult.elixir,
                },
            });
            await this.userModel.findByIdAndUpdate(battleResult.defenderId, {
                $inc: {
                    trophies: -battleResult.trophies,
                    gold: -battleResult.gold,
                    elixir: -battleResult.elixir,
                },
            });
        }
        return battleLog;
    }
};
exports.BattleService = BattleService;
exports.BattleService = BattleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(battle_log_schema_1.BattleLog.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], BattleService);
//# sourceMappingURL=battle.service.js.map