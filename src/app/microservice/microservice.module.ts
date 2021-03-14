import {
	CLIENT_NAME,
	grpcMailClientOption,
} from '@/src/micro-service/client-options/grpc-client.option'
import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { MicroserviceService } from './microservice.service'

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: CLIENT_NAME,
				imports: [ConfigModule],
				inject: [ConfigService],
				// this makes possible for implementing authentication on the remote server
				useFactory: (configService: ConfigService) => grpcMailClientOption,
			},
		]),
	],
	providers: [MicroserviceService],
	exports: [MicroserviceService],
})
export class MicroserviceModule {}
