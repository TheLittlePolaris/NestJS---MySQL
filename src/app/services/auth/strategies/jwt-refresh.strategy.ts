import { AppConfigService } from '@/app/app-config/app-config.service'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { SessionService } from '../../session/session.service'
import { Request } from 'express'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
	constructor(
		private readonly configService: AppConfigService,
		private readonly sessionService: SessionService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					console.log(request.headers, '<===== cookie')
					return request?.headers['x-refresh-token'] as string
				},
			]),
			ignoreExpiration: false,
			secretOrKey: configService.jwtRefreshSecret,
			jsonWebTokenOptions: {
				maxAge: configService.jwtRefreshDuration,
			},
		})
	}

	async validate(payload: { email: string; sessionId: number; type?: string }) {
		console.log(payload)
		const { sessionId } = payload
		return await this.sessionService.validateSession(sessionId)
	}
}
