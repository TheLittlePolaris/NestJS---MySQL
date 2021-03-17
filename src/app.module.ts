import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getConnectionOptions } from 'typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MicroserviceModule } from './microservice/microservice.module';
import { ControllersModule } from './app/controllers/controllers.module';
import { ServicesModule } from './app/services/services.module';
import { AppConfigService } from './app/app-config/app-config.service'
import { AppConfigModule } from './app/app-config/app-config.module'

@Module({
	imports: [
		MicroserviceModule,
		ControllersModule,
		ServicesModule,
		AppConfigModule,
		TypeOrmModule.forRootAsync({
			imports: [AppConfigModule],
			useFactory: async (appConfigService: AppConfigService) =>
				Object.assign(await getConnectionOptions(), {
					host: appConfigService.dbHost,
					port: appConfigService.dbPort,
					username: appConfigService.dbUserName,
					password: appConfigService.dbPassword,
					database: appConfigService.dbName,
				}),
			inject: [AppConfigService],
		}),

	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
