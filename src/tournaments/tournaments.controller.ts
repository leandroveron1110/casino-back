import {
  Body,
  Controller,
  Post,
  Param,
  Patch,
  Get,
  ParseIntPipe,
  UseGuards,
  Put,
} from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/response/create-tournament.dto';
import { JoinTournamentDto } from './dto/response/join-tournament.dto';
import { AssignPrizeDto } from './dto/response/assign-prize.dto';
import { UpdatePointsDto } from './dto/response/update-points.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role, Tournament } from '@prisma/client';

@Controller('tournaments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateTournamentDto) {
    return this.tournamentsService.createTournament(dto);
  }

  @Roles(Role.ADMIN)
  @Post(':id/join')
  join(
    @Param('id', ParseIntPipe) tournamentId: number,
    @Body() dto: JoinTournamentDto,
  ) {
    return this.tournamentsService.joinTournament(tournamentId, dto);
  }

  @Roles(Role.ADMIN)
  @Post(':id/prizes')
  assignPrize(
    @Param('id', ParseIntPipe) tournamentId: number,
    @Body() dto: AssignPrizeDto,
  ) {
    return this.tournamentsService.assignPrize(tournamentId, dto);
  }

  @Roles(Role.ADMIN)
  @Patch(':tournamentId/users/:userId/points')
  updatePoints(
    @Param('tournamentId', ParseIntPipe) tournamentId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: UpdatePointsDto,
  ) {
    return this.tournamentsService.updatePoints(tournamentId, userId, dto);
  }

  @Get(':id/ranking')
  getRanking(@Param('id', ParseIntPipe) tournamentId: number) {
    return this.tournamentsService.getTournamentRanking(tournamentId);
  }

  @Get()
  getAllTournamet() {
    return this.tournamentsService.getAllTournamet()
  }

  @Get(':id/prizes')
  getPrizes(@Param('id', ParseIntPipe) tournamentId: number) {
    return this.tournamentsService.getTournamentPrizes(tournamentId);
  }

  @Get(':id/participants')
  getTournamentParticipants(@Param('id', ParseIntPipe) tournamentId: number) {
    return this.tournamentsService.getTournamentParticipants(tournamentId);
  }

  @Get(':id/participants/prizes')
  getTournamentUsersAndPrizes(@Param('id', ParseIntPipe) tournamentId: number) {
    return this.tournamentsService.getTournamentUsersAndPrizes(tournamentId);
  }

  @Put(':id/users/points/ranking')
  updateUsersPoints(@Param('id', ParseIntPipe) tournamentId: number, @Body() data: { name: string; points: number }[]) {
    return this.tournamentsService.updateUsersPoints(data, tournamentId);
  }

  @Put(':id/users/points/ranking/deposit')
  updatePointsAndDeposits(@Param('id', ParseIntPipe) tournamentId: number, @Body() data: { name: string; depositTotal: number; points: number }[]) {
    return this.tournamentsService.updatePointsAndDeposits(data, tournamentId);
  }

  @Put('update/:id')
  updateTournamnet(@Param('id', ParseIntPipe) tournamentId: number, @Body() data: CreateTournamentDto){
    return this.tournamentsService.updateTournament(tournamentId, data);
  }
}
