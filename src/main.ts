import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const origin = process.env.ORIGIN
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin, // Permití el frontend de Vite
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
