// src/tournaments/relations/tournament-users/tournament-user.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TournamentUserService } from './tournament-user.service';
import { CreateTournamentUserDto } from './dto/create-tournament-user.dto';
import { UpdateTournamentUserDto } from './dto/update-tournament-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('tournaments/users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TournamentUserController {
  constructor(private readonly service: TournamentUserService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateTournamentUserDto) {
    return this.service.create(dto);
  }

  @Get('tournament/:id')
  findByTournament(@Param('id') id: string) {
    return this.service.findByTournament(+id);
  }

  @Get('user/:id')
  findByUser(@Param('id') id: string) {
    return this.service.findByUser(+id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  updatePoints(@Param('id') id: string, @Body() dto: UpdateTournamentUserDto) {
    return this.service.updatePoints(+id, dto.points);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  @Get('ranking/:tournamentId')
  getRanking(@Param('tournamentId') tournamentId: string) {
    return this.service.getRanking(+tournamentId);
  }
}
