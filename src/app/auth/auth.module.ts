import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '@/src/app/user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { MicroserviceModule } from '../microservice/microservice.module'

@Module({
	imports: [
		UserModule,
		MicroserviceModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({ secret: configService.authSecret }),
			inject: [ConfigService],
		}),
	],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
