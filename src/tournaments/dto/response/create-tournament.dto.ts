import { IsDateString, IsString } from 'class-validator';

export class CreateTournamentDto {
  @IsString()
  name: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
