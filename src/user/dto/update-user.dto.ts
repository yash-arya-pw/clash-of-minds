import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  course?: string;

  @IsNumber()
  @IsOptional()
  trophies?: number;

  @IsNumber()
  @IsOptional()
  gold?: number;

  @IsNumber()
  @IsOptional()
  elixir?: number;
} 