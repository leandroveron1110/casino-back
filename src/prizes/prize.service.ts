// src/prizes/prize.service.ts
import { Injectable } from '@nestjs/common';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { UpdatePrizeDto } from './dto/update-prize.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrizeService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreatePrizeDto) {
    return this.prisma.prize.create({
      data: {
        name: dto.name,
        description: dto.description,
        value: dto.value,
        customValue: dto.customValue,
        type: dto.type,
        imageUrl: dto.imageUrl,
      },
    });
  }

  findAll() {
    return this.prisma.prize.findMany();
  }

  findOne(id: number) {
    return this.prisma.prize.findUnique({
      where: { id },
    });
  }

  update(id: number, dto: UpdatePrizeDto) {
    return this.prisma.prize.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        value: dto.value,
        customValue: dto.customValue,
        type: dto.type,
        imageUrl: dto.imageUrl,
      },
    });
  }

  remove(id: number) {
    return this.prisma.prize.delete({
      where: { id },
    });
  }
}
