import { Model } from 'mongoose';
import { ResourceDocument } from './schemas/resource.schema';
import { UserResourceMapping, UserResourceMappingDocument } from './schemas/user-resource-mapping.schema';
import { ImageDocument } from './schemas/image.schema';
interface ResourceData {
    _id: string;
    assetId: string;
    name: string;
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
export declare class ResourcesService {
    private resourceModel;
    private userResourceMappingModel;
    private imageModel;
    constructor(resourceModel: Model<ResourceDocument>, userResourceMappingModel: Model<UserResourceMappingDocument>, imageModel: Model<ImageDocument>);
    getResourcesByUserId(userId: string): Promise<{
        base: ResourceData[];
    }>;
    updateResourcePositions(updateDto: UpdatePositionsDto): Promise<UserResourceMapping[]>;
    upgradeResource(userId: string, assetId: string): Promise<UserResourceMapping>;
}
export {};
