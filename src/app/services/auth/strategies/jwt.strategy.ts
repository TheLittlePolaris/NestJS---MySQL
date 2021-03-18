import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { SessionService } from '../../session/session.service'
import { AppConfigService } from '@/app/app-config/app-config.service'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		private readonly configService: AppConfigService,
		private readonly sessionService: SessionService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.jwtAccessSecret,
			jsonWebTokenOptions: {
				maxAge: configService.jwtAccessDuration,
			},
		})
	}

	async validate(payload: { email: string; sessionId: number; type?: string }) {
		const { sessionId } = payload
		return await this.sessionService.validateSession(sessionId)
	}
}
