import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ProductsModule } from './products/products.module';
import { CollectionsModule } from './collections/collections.module';
import { DatabaseConfiguration } from './typeorm/typeorm.config';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { CategoriesModule } from './categories/categories.module';
import { CartsService } from './carts/carts.service';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';

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
		CartsModule,
		OrdersModule,
	],
	controllers: [AppController],
	providers: [AppService, CartsService],
})
export class AppModule {}
