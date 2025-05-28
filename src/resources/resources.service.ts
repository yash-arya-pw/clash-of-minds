import { Injectable } from '@nestjs/common';
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
} 