import { Model } from 'mongoose';
import { UserDocument } from '../user/user.schema';
import { ResourcesService } from '../resources/resources.service';
import { TroopsService } from '../troops/troops.service';
import { AttackTarget } from './types/attack.types';
export declare class AttackService {
    private userModel;
    private resourcesService;
    private troopsService;
    constructor(userModel: Model<UserDocument>, resourcesService: ResourcesService, troopsService: TroopsService);
    findRandomTarget(excludeUserId: string): Promise<AttackTarget>;
}
