import {
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
} from '@nestjs/common'

import { AuthGuard } from '@nestjs/passport'
import { UserDto } from '../../user/dto/user.dto'

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh-token') {
	constructor() {
		super()
	}
	canActivate(context: ExecutionContext) {
		return super.canActivate(context)
	}

	handleRequest<Error, User>(err, user: User | UserDto, info) {
		console.log(user, '<====== user')
		console.log(err, '<===== err')
		console.log(info.name, '<======= info')

		// You can throw an exception based on either "info" or "err" arguments
		if (!user && (err || info)) {
			throw new HttpException(info['name'], HttpStatus.UNAUTHORIZED)
		}
		return user
	}
}
