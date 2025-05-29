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
exports.TroopsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const troop_schema_1 = require("./schemas/troop.schema");
const user_troop_mapping_schema_1 = require("./schemas/user-troop-mapping.schema");
const image_schema_1 = require("../resources/schemas/image.schema");
let TroopsService = class TroopsService {
    constructor(troopModel, userResourceMappingModel, imageModel) {
        this.troopModel = troopModel;
        this.userResourceMappingModel = userResourceMappingModel;
        this.imageModel = imageModel;
    }
    async createInitialTroopMappings(userId) {
        const troops = await this.troopModel.find().exec();
        const mappings = troops.map((troop) => ({
            userId: new mongoose_2.Types.ObjectId(userId),
            troopId: troop._id,
            quantity: 5,
        }));
        await this.userResourceMappingModel.insertMany(mappings);
    }
    async getTroopsByUserId(userId) {
        const userTroops = await this.userResourceMappingModel
            .find({ userId: new mongoose_2.Types.ObjectId(userId) })
            .populate({
            path: 'troopId',
            model: 'Troop',
            select: 'name attack level imageId'
        })
            .lean()
            .exec();
        const troopsWithImages = await Promise.all(userTroops.map(async (mapping) => {
            const troop = mapping.troopId;
            const image = await this.imageModel.findById(troop.imageId).exec();
            return {
                id: troop._id.toString(),
                name: troop.name,
                attack: troop.attack,
                level: troop.level,
                image_url: image ? image.url : '',
                quantity: mapping.quantity,
            };
        }));
        return troopsWithImages;
    }
    async updateTroopQuantity(userId, troopId, quantity) {
        return this.userResourceMappingModel.findOneAndUpdate({
            userId: new mongoose_2.Types.ObjectId(userId),
            troopId: new mongoose_2.Types.ObjectId(troopId),
        }, {
            $set: { quantity },
        }, { new: true }).exec();
    }
};
exports.TroopsService = TroopsService;
exports.TroopsService = TroopsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(troop_schema_1.Troop.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_troop_mapping_schema_1.UserTroopMapping.name)),
    __param(2, (0, mongoose_1.InjectModel)(image_schema_1.Image.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], TroopsService);
//# sourceMappingURL=troops.service.js.map