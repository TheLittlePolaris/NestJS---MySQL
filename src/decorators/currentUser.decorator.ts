import { createParamDecorator, UnauthorizedException } from '@nestjs/common'

export interface CurrentUserOptions {
	required?: boolean
}

export const CurrentUser: (
	options?: CurrentUserOptions,
) => ParameterDecorator = createParamDecorator((options: CurrentUserOptions = {}, req) => {
	const user = req.user
	console.log(user)
	console.log(options)
	if (options.required && !user) {
		throw new UnauthorizedException()
	}
	return user
})
