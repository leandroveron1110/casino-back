// src/tournaments/relations/tournament-prizes/dto/tournament-prize.dto.ts
import { IsInt } from 'class-validator';

export class TournamentPrizeDto {
  @IsInt()
  position: number;

  prize: {
    id: number;
    name: string;
    description: string;
    value: number;
    customValue: string;
    type: string;  // Asegúrate de usar los valores correctos de tipo (puedes usar Enum aquí si quieres)
    imageUrl: string;
  };
}
