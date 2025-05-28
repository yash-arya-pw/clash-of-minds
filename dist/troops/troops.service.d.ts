import { Model } from 'mongoose';
import { TroopDocument } from './schemas/troop.schema';
import { UserTroopMapping, UserTroopMappingDocument } from './schemas/user-troop-mapping.schema';
import { ImageDocument } from '../resources/schemas/image.schema';
export interface TroopResponse {
    id: string;
    name: string;
    attack: number;
    level: number;
    image_url: string;
    quantity: number;
}
export declare class TroopsService {
    private troopModel;
    private userResourceMappingModel;
    private imageModel;
    constructor(troopModel: Model<TroopDocument>, userResourceMappingModel: Model<UserTroopMappingDocument>, imageModel: Model<ImageDocument>);
    createInitialTroopMappings(userId: string): Promise<void>;
    getTroopsByUserId(userId: string): Promise<TroopResponse[]>;
    updateTroopQuantity(userId: string, troopId: string, quantity: number): Promise<UserTroopMapping>;
}
