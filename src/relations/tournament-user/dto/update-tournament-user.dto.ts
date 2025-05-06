// src/tournaments/relations/tournament-users/dto/update-tournament-user.dto.ts
import { IsInt, IsString } from 'class-validator';

export class UpdateTournamentUserDto {
  @IsString()
  user: string;
  @IsInt()
  points: number;
}
