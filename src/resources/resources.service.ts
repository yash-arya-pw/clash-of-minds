import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Resource, ResourceDocument } from './schemas/resource.schema';
import { UserResourceMapping, UserResourceMappingDocument } from './schemas/user-resource-mapping.schema';
import { Image, ImageDocument } from './schemas/image.schema';

interface ResourceData {
  _id: string;
  assetId: string;
  index: number[];
  imageURL: string;
  level: number;
  health: number;
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
        };
      })
    );

    // Filter out any null values from resources that weren't found
    return { base: base.filter((item): item is ResourceData => item !== null) };
  }

  async updateResourcePositions(updateDto: UpdatePositionsDto): Promise<UserResourceMapping[]> {
    const { userId, positions } = updateDto;
    const userIdObj = new Types.ObjectId(userId);

    // Get all requested positions
    const newPositions = positions.map(p => p.newIndex);

    // Check for duplicates in the requested positions
    const positionStrings = newPositions.map(pos => pos.join(','));
    const uniquePositions = new Set(positionStrings);
    if (uniquePositions.size !== positions.length) {
      throw new ConflictException('Duplicate positions in request');
    }

    // Check if any of the new positions are already occupied by other resources
    const existingMappings = await this.userResourceMappingModel.find({
      userId: userIdObj,
      index: { $in: newPositions },
      assetId: { 
        $nin: positions.map(p => new Types.ObjectId(p.resourceId))
      }
    }).exec();

    if (existingMappings.length > 0) {
      throw new ConflictException('One or more positions are already occupied');
    }

    // Update all resource positions
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

    // Check if any resources were not found
    if (updatedMappings.some(mapping => !mapping)) {
      throw new ConflictException('One or more resource mappings not found');
    }

    return updatedMappings;
  }
} 