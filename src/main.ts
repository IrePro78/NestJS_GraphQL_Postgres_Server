import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	const configService = app.get(ConfigService);
	app.setGlobalPrefix('api/');

	await app.listen(
		configService.get('PORT')
			? parseInt(configService.get('PORT'))
			: 4000,
	);
	console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
