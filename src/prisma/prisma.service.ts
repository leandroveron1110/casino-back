import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  
  async onModuleInit() {
    await this.$connect(); // Conexión al iniciar la app
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Desconexión limpia al apagar la app
  }
}
