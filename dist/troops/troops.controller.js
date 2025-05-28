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
exports.TroopsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt.guard");
const troops_service_1 = require("./troops.service");
let TroopsController = class TroopsController {
    constructor(troopsService) {
        this.troopsService = troopsService;
    }
    async getTroopsByUserId(userId) {
        return this.troopsService.getTroopsByUserId(userId);
    }
    async updateTroopQuantity(userId, troopId, updateDto) {
        return this.troopsService.updateTroopQuantity(userId, troopId, updateDto.quantity);
    }
};
exports.TroopsController = TroopsController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TroopsController.prototype, "getTroopsByUserId", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':userId/troop/:troopId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('troopId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TroopsController.prototype, "updateTroopQuantity", null);
exports.TroopsController = TroopsController = __decorate([
    (0, common_1.Controller)('troops'),
    __metadata("design:paramtypes", [troops_service_1.TroopsService])
], TroopsController);
//# sourceMappingURL=troops.controller.js.map