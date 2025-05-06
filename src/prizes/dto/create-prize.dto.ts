// src/prizes/dto/create-prize.dto.ts
import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { PrizeType } from '@prisma/client';

export class CreatePrizeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsString()
  customValue?: string;

  @IsEnum(PrizeType)
  type: PrizeType;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
