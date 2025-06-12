// src/prizes/prize.controller.ts
import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { PrizeService } from './prize.service';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { UpdatePrizeDto } from './dto/update-prize.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('prizes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PrizeController {
  constructor(private readonly service: PrizeService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreatePrizeDto) {
    return this.service.create(dto);
  }


  @Roles(Role.ADMIN)
  @Post('many')
  createMany(@Body() dto: CreatePrizeDto[]) {
    return this.service.createMany(dto);
  }


  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePrizeDto) {
    return this.service.update(+id, dto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
