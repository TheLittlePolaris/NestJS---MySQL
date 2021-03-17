import { MicroMail, grpcMailClientOption } from '@/microservice/client-options/grpc-client.option'
import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import { AppConfigModule } from '../app/app-config/app-config.module'
import { AppConfigService } from '../app/app-config/app-config.service'
import { MicroserviceService } from './microservice.service'

@Module({
	imports: [
		AppConfigModule,
		ClientsModule.registerAsync([
			{
				imports: [AppConfigModule],
				name: MicroMail,
				inject: [AppConfigService],
				// this makes possible for implementing authentication on the remote server
				useFactory: (appConfigService: AppConfigService) => grpcMailClientOption,
			},
		]),
	],
	providers: [MicroserviceService],
	exports: [MicroserviceService],
})
export class MicroserviceModule {}
