// src/tournaments/relations/tournament-prizes/tournament-prize.controller.ts
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
import { TournamentPrizeService } from './tournament-prize.service';
import { CreateTournamentPrizeDto } from './dto/create-tournament-prize.dto';
import { UpdateTournamentPrizeDto } from './dto/update-tournament-prize.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('tournaments/prizes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TournamentPrizeController {
  constructor(private readonly service: TournamentPrizeService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateTournamentPrizeDto) {
    return this.service.create(dto);
  }

  @Get('tournament/:id')
  findByTournament(@Param('id') id: string) {
    return this.service.findByTournament(+id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTournamentPrizeDto) {
    return this.service.update(+id, dto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
