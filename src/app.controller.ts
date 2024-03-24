import * as path from 'path';
import * as fs from 'fs';
import {
	Controller,
	Get,
	HttpStatus,
	Param,
	Res,
} from '@nestjs/common';
import { type Response } from 'express';
import { AppService } from './app.service';

@Controller('uploads')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get(':filename')
	getFile(@Res() res: Response, @Param('filename') filename: string) {
		const file = path.join(__dirname, '..', 'uploads', filename);

		if (!fs.existsSync(file)) {
			res
				.status(HttpStatus.NOT_FOUND)
				.json({ message: 'Image not found' });
		}
		res.status(HttpStatus.OK).sendFile(file);
	}
}
