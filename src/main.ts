import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
  app.useGlobalPipes(new ValidationPipe());
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
