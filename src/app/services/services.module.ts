import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppConfigModule } from '../app-config/app-config.module'
import { AppConfigService } from '../app-config/app-config.service'
import { MicroserviceModule } from '../../microservice/microservice.module'
import { AuthService } from './auth/auth.service'
import { JwtStrategy } from './auth/strategies/jwt.strategy'
import { SessionRepository } from './session/entity-repository/session.entity-repository'
import { SessionService } from './session/session.service'
import { UserRepository } from './user/entity-repository/user.entity-repository'
import { UserService } from './user/user.service'

const appServices = [UserService, AuthService, SessionService]

const otherProviders = [JwtStrategy]

const services = [...appServices, ...otherProviders]

const repositories = [UserRepository, SessionRepository]

@Module({
	imports: [
		AppConfigModule,
    MicroserviceModule,
		TypeOrmModule.forFeature(repositories),
		PassportModule,
		JwtModule.registerAsync({
			imports: [AppConfigModule],
			useFactory: (configService: AppConfigService) => ({
				secret: configService.authSecret,
			}),
			inject: [AppConfigService],
		}),
	],
	providers: services,
	exports: services,
})
export class ServicesModule {}
