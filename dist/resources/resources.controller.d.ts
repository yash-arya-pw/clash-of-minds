import { ResourcesService } from './resources.service';
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
    positions: ResourcePosition[];
}
interface UpgradeResourceDto {
    assetId: string;
}
export declare class ResourcesController {
    private readonly resourcesService;
    constructor(resourcesService: ResourcesService);
    getResourcesByUserId(userId: string): Promise<{
        base: ResourceData[];
    }>;
    updateResourcePositions(userId: string, updateDto: UpdatePositionsDto): Promise<import("./schemas/user-resource-mapping.schema").UserResourceMapping[]>;
    upgradeResource(userId: string, upgradeDto: UpgradeResourceDto): Promise<import("./schemas/user-resource-mapping.schema").UserResourceMapping>;
}
export {};
