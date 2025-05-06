import { IsInt, IsPositive } from 'class-validator';

export class AddPrizeDto {
  @IsInt()
  prizeId: number;

  @IsInt()
  @IsPositive()
  position: number;
}
