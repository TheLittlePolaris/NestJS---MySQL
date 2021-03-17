import { Body, Controller, Get, Header, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from '@/app/services/auth/auth.service'
import { LoginDto } from '../../services/auth/dto/auth.dto'
import { CreateUserDto, UserDto } from '../../services/user/dto/user.dto'
import { ApiHeader, ApiHeaderOptions, ApiTags } from '@nestjs/swagger'
import { CurrentUser } from '@/decorators/current-user.decorator'
import { User } from '@/app/services/user/entity/user.entity'
import { request } from 'express'
import { JwtRefreshAuthGuard } from '@/app/services/auth/guards/jwt-refresh.guard'

@Controller('auth')
@ApiTags('Authentication')
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

	@Post('/refresh')
	@UseGuards(JwtRefreshAuthGuard)
	@ApiHeader(<ApiHeaderOptions>{
		name: 'X-Refresh-Token',
		description: 'The refresh token to exchange for new access token',
	})
	async refreshToken(@CurrentUser() user: UserDto) {
		return await this.authSevice.exchangeSession(user)
	}
}
