import {
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	Logger,
	UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

import { SetMetadata } from '@nestjs/common'
import { User } from '../../user/entity/user.entity'
import { UserDto } from '../../user/dto/user.dto'

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super()
	}
	canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		])
		if (isPublic) {
			return true
		}

		return super.canActivate(context)
	}

	handleRequest<Error, User>(err, user: User | UserDto, info) {
		console.log(user, '<====== user')
		console.log(err, '<===== err')
		console.log(info, '<======= info')

		// You can throw an exception based on either "info" or "err" arguments
		if (!user && (err || info)) {
			throw new HttpException(info['name'], HttpStatus.UNAUTHORIZED)
		}
		return user
	}
}
