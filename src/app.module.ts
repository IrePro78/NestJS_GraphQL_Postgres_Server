import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import {
	ApolloDriver,
	type ApolloDriverConfig,
} from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CollectionsModule } from './collections/collections.module';
import { DatabaseConfiguration } from './typeorm/typeorm.config';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { WebhookHandlerModule } from './webhook-handler/webhook-handler.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			useClass: DatabaseConfiguration,
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: 'src/schema.gql',
			playground: false,
			plugins: [ApolloServerPluginLandingPageLocalDefault()],
		}),
		ProductsModule,
		CollectionsModule,
		CategoriesModule,
		OrdersModule,
		WebhookHandlerModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
