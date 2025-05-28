import { ResourcesService } from './resources.service';
interface ResourceData {
    _id: string;
    assetId: string;
    index: number[];
    imageURL: string;
    level: number;
    health: number;
}
export declare class ResourcesController {
    private readonly resourcesService;
    constructor(resourcesService: ResourcesService);
    getResourcesByUserId(userId: string): Promise<{
        base: ResourceData[];
    }>;
}
export {};
