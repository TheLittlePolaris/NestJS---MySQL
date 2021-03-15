import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '@/src/app/user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { MicroserviceModule } from '../microservice/microservice.module'
import { read, readSync } from 'fs'
import { resolve } from 'path'
import { JwtStrategy } from './strategies/jwt.strategy'
import { PassportModule } from '@nestjs/passport'


@Module({
	imports: [
		UserModule,
		MicroserviceModule,
		PassportModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.authSecret,
				signOptions: { expiresIn: '12h' },
			}),
			inject: [ConfigService],
		}),
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
