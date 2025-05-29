import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Resource, ResourceDocument } from './schemas/resource.schema';
import { UserResourceMapping, UserResourceMappingDocument } from './schemas/user-resource-mapping.schema';
import { Image, ImageDocument } from './schemas/image.schema';

interface ResourceData {
  _id: string;
  assetId: string;
  name: string;
  index: number[];
  imageURL: string;
  level: number;
  health: number;
  costToUpgrade: number;
}

interface ResourcePosition {
  resourceId: string;
  newIndex: number[];
}

interface UpdatePositionsDto {
  userId: string;
  positions: ResourcePosition[];
}

@Injectable()
export class ResourcesService {
  constructor(
    @InjectModel(Resource.name) private resourceModel: Model<ResourceDocument>,
    @InjectModel(UserResourceMapping.name) private userResourceMappingModel: Model<UserResourceMappingDocument>,
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
  ) {}

  async getResourcesByUserId(userId: string): Promise<{ base: ResourceData[] }> {
    // Convert string userId to ObjectId
    const userIdObj = new Types.ObjectId(userId);

    // Get all user resource mappings for this user
    const userResources = await this.userResourceMappingModel
      .find({ userId: userIdObj })
      .sort({ 'index.0': 1, 'index.1': 1 })
      .exec();

    // Process each resource mapping
    const base = await Promise.all(
      userResources.map(async (mapping) => {
        const resource = await this.resourceModel.findById(mapping.assetId).exec();
        if (!resource) return null;

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
      })
    );

    // Filter out any null values from resources that weren't found
    return { base: base.filter((item): item is ResourceData => item !== null) };
  }

  async updateResourcePositions(updateDto: UpdatePositionsDto): Promise<UserResourceMapping[]> {
    const { userId, positions } = updateDto;
    const userIdObj = new Types.ObjectId(userId);

    // First, fetch all existing mappings for this user
    const allUserMappings = await this.userResourceMappingModel.find({
      userId: userIdObj,
    }).lean().exec();

    // Create a map of existing positions
    const existingPositionsMap = new Map();
    allUserMappings.forEach(mapping => {
      existingPositionsMap.set(mapping.assetId.toString(), mapping.index);
    });

    // Create a map to check for position conflicts
    const newPositionsMap = new Map();
    
    // Validate positions
    for (const { resourceId, newIndex } of positions) {
      // Check if the resource exists for this user
      const existingPosition = existingPositionsMap.get(resourceId);
      if (!existingPosition) {
        throw new ConflictException(`Resource with ID ${resourceId} not found for this user`);
      }

      // Convert position to string for comparison
      const positionKey = newIndex.join(',');
      
      // Check if this position is already taken in new positions
      if (newPositionsMap.has(positionKey)) {
        throw new ConflictException('Duplicate positions in request');
      }

      // Add to new positions map
      newPositionsMap.set(positionKey, resourceId);
    }

    // If we reach here, all positions are valid. Perform the updates
    const updatePromises = positions.map(({ resourceId, newIndex }) =>
      this.userResourceMappingModel.findOneAndUpdate(
        {
          assetId: new Types.ObjectId(resourceId),
          userId: userIdObj,
        },
        {
          $set: { index: newIndex },
        },
        { new: true },
      ).exec()
    );

    const updatedMappings = await Promise.all(updatePromises);

    // Final validation to ensure all updates were successful
    if (updatedMappings.some(mapping => !mapping)) {
      throw new ConflictException('One or more resource mappings failed to update');
    }

    return updatedMappings;
  }

  async upgradeResource(userId: string, assetId: string): Promise<UserResourceMapping> {
    const userIdObj = new Types.ObjectId(userId);
    const assetIdObj = new Types.ObjectId(assetId);

    // Find the current resource
    const currentResource = await this.resourceModel.findById(assetIdObj).exec();
    if (!currentResource) {
      throw new ConflictException('Resource not found');
    }

    // Find the next level resource with the same name
    const nextLevelResource = await this.resourceModel.findOne({
      name: currentResource.name,
      level: currentResource.level + 1
    }).exec();

    if (!nextLevelResource) {
      throw new ConflictException('No upgrade available for this resource');
    }

    // Update the user resource mapping with the new assetId
    const updatedMapping = await this.userResourceMappingModel.findOneAndUpdate(
      {
        userId: userIdObj,
        assetId: assetIdObj
      },
      {
        $set: { assetId: nextLevelResource._id }
      },
      { new: true }
    ).exec();

    if (!updatedMapping) {
      throw new ConflictException('Resource mapping not found');
    }

    return updatedMapping;
  }
} 