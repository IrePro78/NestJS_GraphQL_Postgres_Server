import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
	const app =
		await NestFactory.create<NestExpressApplication>(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	const configService = app.get(ConfigService);
	app.setGlobalPrefix('api/');
	app.useStaticAssets(join(__dirname, '..', 'uploads'));

	await app.listen(
		configService.get('PORT')
			? parseInt(configService.get('PORT'))
			: 4000,
	);
	console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
