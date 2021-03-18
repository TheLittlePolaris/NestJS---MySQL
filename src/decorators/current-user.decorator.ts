import { createParamDecorator, UnauthorizedException } from '@nestjs/common'
import { Request, Response } from 'express'

export interface CurrentUserOptions {
	required?: boolean
}

export const CurrentUser: (
	options?: CurrentUserOptions,
) => ParameterDecorator = createParamDecorator(
	(options: CurrentUserOptions = {}, req: { args: [Request, Response] }) => {
		const [request, response] = req.args
		const user = request.user
		console.log(request.user, '<====== req userrr')
		console.log(options)
		if (options.required && !user) {
			throw new UnauthorizedException()
		}
		return user
	},
)
