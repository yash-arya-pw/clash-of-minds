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
exports.ResourcesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const resource_schema_1 = require("./schemas/resource.schema");
const user_resource_mapping_schema_1 = require("./schemas/user-resource-mapping.schema");
const image_schema_1 = require("./schemas/image.schema");
let ResourcesService = class ResourcesService {
    constructor(resourceModel, userResourceMappingModel, imageModel) {
        this.resourceModel = resourceModel;
        this.userResourceMappingModel = userResourceMappingModel;
        this.imageModel = imageModel;
    }
    async getResourcesByUserId(userId) {
        const userIdObj = new mongoose_2.Types.ObjectId(userId);
        const userResources = await this.userResourceMappingModel
            .find({ userId: userIdObj })
            .sort({ 'index.0': 1, 'index.1': 1 })
            .exec();
        const base = await Promise.all(userResources.map(async (mapping) => {
            const resource = await this.resourceModel.findById(mapping.assetId).exec();
            if (!resource)
                return null;
            const image = await this.imageModel.findById(resource.imageId).exec();
            return {
                _id: mapping._id.toString(),
                assetId: resource._id.toString(),
                name: resource.name,
                index: mapping.index,
                imageURL: image ? image.url : '',
                level: resource.level,
                health: resource.health,
                costToUpgrade: resource.cost,
            };
        }));
        return { base: base.filter((item) => item !== null) };
    }
    async updateResourcePositions(updateDto) {
        const { userId, positions } = updateDto;
        const userIdObj = new mongoose_2.Types.ObjectId(userId);
        const allUserMappings = await this.userResourceMappingModel.find({
            userId: userIdObj,
        }).lean().exec();
        const existingPositionsMap = new Map();
        allUserMappings.forEach(mapping => {
            existingPositionsMap.set(mapping.assetId.toString(), mapping.index);
        });
        const newPositionsMap = new Map();
        for (const { resourceId, newIndex } of positions) {
            const existingPosition = existingPositionsMap.get(resourceId);
            if (!existingPosition) {
                throw new common_1.ConflictException(`Resource with ID ${resourceId} not found for this user`);
            }
            const positionKey = newIndex.join(',');
            if (newPositionsMap.has(positionKey)) {
                throw new common_1.ConflictException('Duplicate positions in request');
            }
            newPositionsMap.set(positionKey, resourceId);
        }
        const updatePromises = positions.map(({ resourceId, newIndex }) => this.userResourceMappingModel.findOneAndUpdate({
            assetId: new mongoose_2.Types.ObjectId(resourceId),
            userId: userIdObj,
        }, {
            $set: { index: newIndex },
        }, { new: true }).exec());
        const updatedMappings = await Promise.all(updatePromises);
        if (updatedMappings.some(mapping => !mapping)) {
            throw new common_1.ConflictException('One or more resource mappings failed to update');
        }
        return updatedMappings;
    }
    async upgradeResource(userId, assetId) {
        const userIdObj = new mongoose_2.Types.ObjectId(userId);
        const assetIdObj = new mongoose_2.Types.ObjectId(assetId);
        const currentResource = await this.resourceModel.findById(assetIdObj).exec();
        if (!currentResource) {
            throw new common_1.ConflictException('Resource not found');
        }
        const nextLevelResource = await this.resourceModel.findOne({
            name: currentResource.name,
            level: currentResource.level + 1
        }).exec();
        if (!nextLevelResource) {
            throw new common_1.ConflictException('No upgrade available for this resource');
        }
        const updatedMapping = await this.userResourceMappingModel.findOneAndUpdate({
            userId: userIdObj,
            assetId: assetIdObj
        }, {
            $set: { assetId: nextLevelResource._id }
        }, { new: true }).exec();
        if (!updatedMapping) {
            throw new common_1.ConflictException('Resource mapping not found');
        }
        return updatedMapping;
    }
};
exports.ResourcesService = ResourcesService;
exports.ResourcesService = ResourcesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(resource_schema_1.Resource.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_resource_mapping_schema_1.UserResourceMapping.name)),
    __param(2, (0, mongoose_1.InjectModel)(image_schema_1.Image.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ResourcesService);
//# sourceMappingURL=resources.service.js.map