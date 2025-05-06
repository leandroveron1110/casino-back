// src/tournaments/dto/tournament-with-prizes.dto.ts
import { IsString, IsDateString } from 'class-validator';
import { TournamentPrizeDto } from './tournament-prize.dto';

export class TournamentWithPrizesDto {
  @IsString()
  name: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  prizes: TournamentPrizeDto[];
  
}

