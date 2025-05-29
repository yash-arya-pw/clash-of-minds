export interface AttackTarget {
  user: {
    id: string;
    name: string;
    trophies: number;
    gold: number;
    elixir: number;
  };
  base: {
    resources: any[];
    troops: any[];
  };
} 