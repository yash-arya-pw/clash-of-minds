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
exports.AttackService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/user.schema");
const resources_service_1 = require("../resources/resources.service");
const troops_service_1 = require("../troops/troops.service");
let AttackService = class AttackService {
    constructor(userModel, resourcesService, troopsService) {
        this.userModel = userModel;
        this.resourcesService = resourcesService;
        this.troopsService = troopsService;
    }
    async findRandomTarget(excludeUserId) {
        const users = await this.userModel
            .find({ _id: { $ne: excludeUserId } })
            .select('name trophies')
            .exec();
        if (users.length === 0) {
            throw new Error('No targets available');
        }
        const randomIndex = Math.floor(Math.random() * users.length);
        const targetUser = users[randomIndex];
        const [resources, troops] = await Promise.all([
            this.resourcesService.getResourcesByUserId(targetUser._id.toString()),
            this.troopsService.getTroopsByUserId(targetUser._id.toString()),
        ]);
        return {
            user: {
                id: targetUser._id.toString(),
                name: targetUser.name,
                trophies: targetUser.trophies,
            },
            base: {
                resources: resources.base,
                troops,
            },
        };
    }
};
exports.AttackService = AttackService;
exports.AttackService = AttackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        resources_service_1.ResourcesService,
        troops_service_1.TroopsService])
], AttackService);
//# sourceMappingURL=attack.service.js.map