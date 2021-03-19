import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}
	canActivate(context: ExecutionContext) {
		const rolesForContext = this.reflector.get<string[]>('roles', context.getHandler())

		if (!rolesForContext) {
			return true
		}
		const request = context.switchToHttp().getRequest()
		const { roles = [] } = request.user || {}

		if (!roles.length) return false

		const hasRole = (): boolean =>
			roles?.some((role) => !!roles?.find((item) => item === role)) || false

		return hasRole()
	}
}
