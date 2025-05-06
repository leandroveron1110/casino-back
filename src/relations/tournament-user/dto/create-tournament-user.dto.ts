// src/tournaments/relations/tournament-users/dto/create-tournament-user.dto.ts
import { IsInt, IsOptional } from 'class-validator';

export class CreateTournamentUserDto {
  @IsInt()
  userId: number;

  @IsInt()
  tournamentId: number;

  @IsOptional()
  @IsInt()
  points?: number;
}
