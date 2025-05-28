import { IsString, IsNumber, IsMongoId } from 'class-validator';

export class BattleResultDto {
  @IsString()
  result: 'win' | 'lose';

  @IsMongoId()
  attackerId: string;

  @IsMongoId()
  defenderId: string;

  @IsNumber()
  trophies: number;

  @IsNumber()
  gold: number;

  @IsNumber()
  elixir: number;
} 