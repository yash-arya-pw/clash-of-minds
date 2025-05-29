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
exports.BattleController = void 0;
const common_1 = require("@nestjs/common");
const battle_service_1 = require("./battle.service");
const battle_result_dto_1 = require("./dto/battle-result.dto");
let BattleController = class BattleController {
    constructor(battleService) {
        this.battleService = battleService;
    }
    async processBattleResult(battleResult) {
        return this.battleService.processBattleResult(battleResult);
    }
};
exports.BattleController = BattleController;
__decorate([
    (0, common_1.Post)('result'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [battle_result_dto_1.BattleResultDto]),
    __metadata("design:returntype", Promise)
], BattleController.prototype, "processBattleResult", null);
exports.BattleController = BattleController = __decorate([
    (0, common_1.Controller)('battle'),
    __metadata("design:paramtypes", [battle_service_1.BattleService])
], BattleController);
//# sourceMappingURL=battle.controller.js.map