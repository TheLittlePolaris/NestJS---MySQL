import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/auth.dto'
import { CreateUserDto } from '../user/dto/user.dto'
import { ApiBody, ApiTags } from '@nestjs/swagger'

@Controller('auth')
@ApiTags("Authentication")
export class AuthController {
	constructor(private authSevice: AuthService) {}

	@Post('/login')
	async userLogin(@Body() loginDto: LoginDto) {
		return this.authSevice.signIn(loginDto)
	}

	@Post('/signup')
	async userSignUp(@Body() signUpBody: CreateUserDto) {
		return await this.authSevice.signUp(signUpBody)
	}
}
