import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getConnectionOptions } from 'typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './app/user/user.module'
import { AuthModule } from './app/auth/auth.module'
import { ConfigService } from './app/config/config.service'
import { ConfigModule } from './app/config/config.module'
import { SessionModule } from './app/session/session.module'
import { MicroserviceModule } from './app/microservice/microservice.module';

@Module({
	imports: [
		ConfigModule,
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) =>
				Object.assign(await getConnectionOptions(), {
					host: configService.dbHost,
					port: configService.dbPort,
					username: configService.dbUserName,
					password: configService.dbPassword,
					database: configService.dbName,
				}),
			inject: [ConfigService],
		}),
		UserModule,
		AuthModule,
		SessionModule,
		MicroserviceModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
