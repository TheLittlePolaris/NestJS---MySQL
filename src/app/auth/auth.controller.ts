import { Body, Controller, Get, Post } from '@nestjs/common'
import { UserService } from '@/src/app/user/user.service'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private authSevice: AuthService) {}

	@Post('login')
	async userLogin(@Body() login: LoginDto) {
		return {}
	}

	@Post('signup')
	async userSignUp(@Body() login: LoginDto) {
		return {}
	}
}
