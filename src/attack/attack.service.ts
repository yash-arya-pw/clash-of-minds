import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user.schema';
import { ResourcesService } from '../resources/resources.service';
import { TroopsService } from '../troops/troops.service';
import { AttackTarget } from './types/attack.types';

@Injectable()
export class AttackService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private resourcesService: ResourcesService,
    private troopsService: TroopsService,
  ) {}

  async findRandomTarget(excludeUserId: string): Promise<AttackTarget> {
    // Find a random user excluding the attacker
    const users = await this.userModel
      .find({ _id: { $ne: excludeUserId } })
      .select('name trophies')
      .exec();

    if (users.length === 0) {
      throw new Error('No targets available');
    }

    // Select a random user
    const randomIndex = Math.floor(Math.random() * users.length);
    const targetUser = users[randomIndex];

    // Get the target's base details
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
} 