import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, Logger } from '@nestjs/common'
import { UserDto } from '../../user/dto/user.dto'
import { User } from '../../user/entity/user.entity'
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
			secretOrKey: configService.authSecret,
			jsonWebTokenOptions: {
				maxAge: 86400,
			},
		})
	}

	async validate(payload: { email: string; sessionId: number; type?: string }) {
		console.log(payload, "<====== validate payload")
		const { email, sessionId, type = null } = payload
		await this.sessionService.validateSession(email, sessionId, type)
		return { email, sessionId }
	}

	/**
	 * Performs authentication for the request.
	 * Note: Virtual function - re-implement in the strategy.
	 * @param req The request to authenticate.
	 * @param options Options passed to the strategy.
	 */
	// authenticate(req: express.Request, options?: any): void {
	// 	// console.log(req, 'JWT Authenticate')
	// }

	//
	// Augmented strategy functions.
	// These are available only from the 'authenticate' function.
	// They are added manually by the passport framework.
	//

	/**
	 * Authenticate `user`, with optional `info`.
	 *
	 * Strategies should call this function to successfully authenticate a
	 * user.  `user` should be an object supplied by the application after it
	 * has been given an opportunity to verify credentials.  `info` is an
	 * optional argument containing additional user information.  This is
	 * useful for third-party authentication strategies to pass profile
	 * details.
	 *
	 * @param {Object} user
	 * @param {Object} info
	 * @api public
	 */
	success(user: UserDto | User, info?: any): void {
		console.log(`${user.fullName} logged in`)
	}

	/**
	 * Fail authentication, with optional `challenge` and `status`, defaulting
	 * to 401.
	 *
	 * Strategies should call this function to fail an authentication attempt.
	 *
	 * @param {String} challenge (Can also be an object with 'message' and 'type' fields).
	 * @param {Number} status
	 * @api public
	 */
	// fail(challenge: any, status: number): void {};
	// fail(status: number): void {};

	/**
	 * Redirect to `url` with optional `status`, defaulting to 302.
	 *
	 * Strategies should call this function to redirect the user (via their
	 * user agent) to a third-party website for authentication.
	 *
	 * @param {String} url
	 * @param {Number} status
	 * @api public
	 */
	// redirect(url: string, status?: number): void {
	// 	Logger.log(url, 'JWT Redirect')
	// }

	/**
	 * Pass without making a success or fail decision.
	 *
	 * Under most circumstances, Strategies should not need to call this
	 * function.  It exists primarily to allow previous authentication state
	 * to be restored, for example from an HTTP session.
	 *
	 * @api public
	 */
	// pass(): void {
	// 	Logger.log('PASS', 'JWT PASS')
	// }

	/**
	 * Internal error while performing authentication.
	 *
	 * Strategies should call this function when an internal error occurs
	 * during the process of performing authentication; for example, if the
	 * user directory is not available.
	 *
	 * @param {Error} err
	 * @api public
	 */
	// error(err: Error): void {
	// 	Logger.log(err, 'JWT Error')
	// }
}
