import { AttackService } from './attack.service';
import { AttackTarget } from './types/attack.types';
export declare class AttackController {
    private readonly attackService;
    constructor(attackService: AttackService);
    findRandomTarget(req: any): Promise<AttackTarget>;
}
