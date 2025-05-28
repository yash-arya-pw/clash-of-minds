import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Troop, TroopDocument } from './schemas/troop.schema';
import { UserTroopMapping, UserTroopMappingDocument } from './schemas/user-troop-mapping.schema';
import { Image, ImageDocument } from '../resources/schemas/image.schema';

export interface TroopResponse {
  id: string;
  name: string;
  attack: number;
  level: number;
  image_url: string;
  quantity: number;
}

@Injectable()
export class TroopsService {
  constructor(
    @InjectModel(Troop.name) private troopModel: Model<TroopDocument>,
    @InjectModel(UserTroopMapping.name) private userResourceMappingModel: Model<UserTroopMappingDocument>,
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
  ) {}

  async createInitialTroopMappings(userId: string): Promise<void> {
    // Get all troops
    const troops = await this.troopModel.find().exec();

    // Create mappings with 5 troops each
    const mappings = troops.map((troop) => ({
      userId: new Types.ObjectId(userId),
      troopId: troop._id,
      quantity: 5, // Initial quantity of 5 for each troop type
    }));

    // Insert all mappings
    await this.userResourceMappingModel.insertMany(mappings);
  }

  async getTroopsByUserId(userId: string): Promise<TroopResponse[]> {
    const userTroops = await this.userResourceMappingModel
      .find({ userId: new Types.ObjectId(userId) })
      .populate({
        path: 'troopId',
        model: 'Troop',
        select: 'name attack level imageId'
      })
      .lean()
      .exec();

    const troopsWithImages = await Promise.all(
      userTroops.map(async (mapping) => {
        const troop = mapping.troopId as any;
        const image = await this.imageModel.findById(troop.imageId).exec();

        return {
          id: troop._id.toString(),
          name: troop.name,
          attack: troop.attack,
          level: troop.level,
          image_url: image ? image.url : '',
          quantity: mapping.quantity,
        };
      }),
    );

    return troopsWithImages;
  }

  async updateTroopQuantity(
    userId: string,
    troopId: string,
    quantity: number,
  ): Promise<UserTroopMapping> {
    return this.userResourceMappingModel.findOneAndUpdate(
      {
        userId: new Types.ObjectId(userId),
        troopId: new Types.ObjectId(troopId),
      },
      {
        $set: { quantity },
      },
      { new: true },
    ).exec();
  }
} 