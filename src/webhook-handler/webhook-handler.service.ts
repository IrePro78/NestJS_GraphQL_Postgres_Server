import { Injectable } from '@nestjs/common';

import { type WebhookHandler } from './webhook-handler.interface';

@Injectable()
export class WebhookHandlerService implements WebhookHandler {
	async handleWebhook(payload: any): Promise<void> {
		// Implement your webhook handling logic here
		console.log('Received webhook payload:', payload);
		// Add your custom logic here
	}
}
