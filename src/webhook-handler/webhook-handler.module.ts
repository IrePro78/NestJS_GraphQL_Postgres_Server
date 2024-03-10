import { Module } from '@nestjs/common';
import { WebhookHandlerResolver } from '../graphql/resolvers/webhook-handler.resolver';
import { WebhookHandlerService } from './webhook-handler.service';

@Module({
	providers: [WebhookHandlerService, WebhookHandlerResolver],
})
export class WebhookHandlerModule {}
