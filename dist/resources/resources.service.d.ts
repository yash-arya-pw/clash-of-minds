import { Model } from 'mongoose';
import { ResourceDocument } from './schemas/resource.schema';
import { UserResourceMappingDocument } from './schemas/user-resource-mapping.schema';
import { ImageDocument } from './schemas/image.schema';
interface ResourceData {
    _id: string;
    assetId: string;
    index: number[];
    imageURL: string;
    level: number;
    health: number;
}
export declare class ResourcesService {
    private resourceModel;
    private userResourceMappingModel;
    private imageModel;
    constructor(resourceModel: Model<ResourceDocument>, userResourceMappingModel: Model<UserResourceMappingDocument>, imageModel: Model<ImageDocument>);
    getResourcesByUserId(userId: string): Promise<{
        base: ResourceData[];
    }>;
}
export {};
