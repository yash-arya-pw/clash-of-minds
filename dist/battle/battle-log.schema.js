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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleLogSchema = exports.BattleLog = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BattleLog = class BattleLog {
};
exports.BattleLog = BattleLog;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, auto: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BattleLog.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BattleLog.prototype, "attackerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BattleLog.prototype, "defenderId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BattleLog.prototype, "result", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], BattleLog.prototype, "trophies", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], BattleLog.prototype, "gold", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], BattleLog.prototype, "elixir", void 0);
exports.BattleLog = BattleLog = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], BattleLog);
exports.BattleLogSchema = mongoose_1.SchemaFactory.createForClass(BattleLog);
//# sourceMappingURL=battle-log.schema.js.map