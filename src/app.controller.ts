import * as path from 'path';
import * as fs from 'fs';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { type Response } from 'express';
import { AppService } from './app.service';

@Controller('uploads')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get(':filename')
	serveImage(
		@Param('filename') filename: string,
		@Res() res: Response,
	) {
		const imagePath = path.join(__dirname, '..', 'uploads', filename);
		// Sprawdź, czy plik istnieje
		console.log('imagePath', imagePath);

		if (fs.existsSync(imagePath)) {
			// Jeśli istnieje, przekaż plik jako odpowiedź
			res.sendFile(imagePath);
		} else {
			// Jeśli nie istnieje, zwróć odpowiedni status
			res.status(404).json({ message: 'Image not found' });
		}
	}
}
