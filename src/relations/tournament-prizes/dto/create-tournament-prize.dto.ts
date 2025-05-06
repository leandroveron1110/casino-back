// src/tournaments/relations/tournament-prizes/dto/create-tournament-prize.dto.ts
import { IsInt } from 'class-validator';

export class CreateTournamentPrizeDto {
  @IsInt()
  tournamentId: number;

  @IsInt()
  prizeId: number;

  @IsInt()
  position: number;
}
