import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { UserDto } from '../../user/dto/user.dto'

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh-token') {
	constructor(private reflector: Reflector) {
		super()
	}
	canActivate(context: ExecutionContext) {
		return super.canActivate(context)
	}

	handleRequest<Error, User>(err, user: User | UserDto, info) {
		console.log(user, ' <====== user')
		console.log(err, ' <===== err')
		console.log(info, ' <===== info')

		// You can throw an exception based on either "info" or "err" arguments
		if (err || !user) {
			throw err || new UnauthorizedException()
		}
		return user
	}
}
