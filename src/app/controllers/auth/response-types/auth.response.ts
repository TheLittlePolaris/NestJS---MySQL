import { AuthResponsePayload } from '@/app/services/auth/dto/auth.dto'
import { ApiResponseOptions } from '@nestjs/swagger'

export const LOGIN_RESPONSE_TYPES: ApiResponseOptions[] = [
	{
		status: 'default',
		type: () => AuthResponsePayload,
	},
	{
		status: 404,
		description: 'User not exists',
	},
	{
		status: 401,
		description: 'Incorrect password',
	},
]
