import { IsInt } from 'class-validator';

export class UpdatePointsDto {
  @IsInt()
  points: number;
}
