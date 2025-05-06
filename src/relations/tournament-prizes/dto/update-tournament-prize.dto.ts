// src/tournaments/relations/tournament-prizes/dto/update-tournament-prize.dto.ts
import { IsInt } from 'class-validator';

export class UpdateTournamentPrizeDto {
  @IsInt()
  prizeId: number;

  @IsInt()
  position: number;
}
