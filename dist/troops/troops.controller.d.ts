import { TroopsService, TroopResponse } from './troops.service';
interface UpdateTroopQuantityDto {
    quantity: number;
}
export declare class TroopsController {
    private readonly troopsService;
    constructor(troopsService: TroopsService);
    getTroopsByUserId(userId: string): Promise<TroopResponse[]>;
    updateTroopQuantity(userId: string, troopId: string, updateDto: UpdateTroopQuantityDto): Promise<import("./schemas/user-troop-mapping.schema").UserTroopMapping>;
}
export {};
