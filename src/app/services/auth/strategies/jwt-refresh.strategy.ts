import { AppConfigService } from "@/app/app-config/app-config.service";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport";
import { ExtractJwt } from "passport-jwt";
import { SessionService } from "../../session/session.service";
import { Request } from 'express'


@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(private readonly configService: AppConfigService, private readonly sessionService: SessionService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request:Request) => request?.cookies['X-Refresh-Token']]),
			ignoreExpiration: false,
			secretOrKey: configService.jwtRefreshSecret,
			jsonWebTokenOptions: {
				maxAge: configService.jwtRefreshDuration,
			},
    })
  }


	async validate(payload: { email: string; sessionId: number }) {

		console.log(payload, "<====== validate payload")
		const { email, sessionId } = payload
		await this.sessionService.validateSession(sessionId)
		return { email, sessionId }
	}
	
}





