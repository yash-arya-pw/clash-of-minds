export interface AttackTarget {
    user: {
        id: string;
        name: string;
        trophies: number;
    };
    base: {
        resources: any[];
        troops: any[];
    };
}
