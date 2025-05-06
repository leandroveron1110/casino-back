// src/prizes/dto/update-prize.dto.ts
import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { PrizeType } from '@prisma/client';

export class UpdatePrizeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsString()
  customValue?: string;

  @IsOptional()
  @IsEnum(PrizeType)
  type?: PrizeType;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
