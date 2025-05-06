// src/tournaments/services/tournament-mapper.service.ts
import { Injectable } from '@nestjs/common';
import { Tournament } from '@prisma/client';
import { TournamentWithPrizesDto } from '../response/tournament-with-prizes.dto';
import { TournamentPrizeDto } from '../response/tournament-prize.dto';

@Injectable()
export class TournamentMapperService {
  // Mapper para Tournament con sus premios
  mapToTournamentWithPrizesDto(tournament: Tournament, prizes: any[]): TournamentWithPrizesDto {
    return {
      name: tournament.name,
      startDate: tournament.startDate.toISOString(),
      endDate: tournament.endDate.toISOString(),
      prizes: prizes.map(prize => this.mapPrizeToDto(prize)),
    };
  }

  // Mapper para Prize
  private mapPrizeToDto(prize: any): TournamentPrizeDto {
    return {
      position: prize.position,
      prize: {
        id: prize.prize.id,
        name: prize.prize.name,
        description: prize.prize.description,
        value: prize.prize.value,
        customValue: prize.prize.customValue,
        type: prize.prize.type,
        imageUrl: prize.prize.imageUrl,
      },
    };
  }
}
