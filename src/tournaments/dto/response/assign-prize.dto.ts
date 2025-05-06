import { IsInt } from 'class-validator';

export class AssignPrizeDto {
  @IsInt()
  prizeId: number;

  @IsInt()
  position: number;
}
