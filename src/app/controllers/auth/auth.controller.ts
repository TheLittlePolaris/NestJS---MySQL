import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthService } from '@/app/services/auth/auth.service'
import { LoginDto, AuthResponsePayload } from '../../services/auth/dto/auth.dto'
import { CreateUserDto, UserDto } from '../../services/user/dto/user.dto'
import {
	ApiBearerAuth,
	ApiHeader,
	ApiHeaderOptions,
	ApiOperation,
	ApiOperationOptions,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { CurrentUser } from '@/decorators/current-user.decorator'
import { JwtRefreshAuthGuard } from '@/app/services/auth/guards/jwt-refresh.guard'
import { JwtAuthGuard } from '@/app/services/auth/guards/jwt.guard'
import { ApiResponses } from '@/decorators/custom/nest/swagger.decorator'
import { LOGIN_RESPONSE_TYPES } from './response-types/auth.response'

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
	constructor(private authSevice: AuthService) {}

	@Post('/login')
	@ApiOperation({
		summary: 'Login for user',
	})
	@ApiResponses(LOGIN_RESPONSE_TYPES)
	async userLogin(@Body() loginDto: LoginDto) {
		return this.authSevice.signIn(loginDto)
	}

	@Post('/signup')
	@ApiOperation({
		summary: 'Login for user',
	})
	@ApiResponses(LOGIN_RESPONSE_TYPES)
	async userSignUp(@Body() signUpBody: CreateUserDto) {
		return await this.authSevice.signUp(signUpBody)
	}

	@Post('/logout')
	@ApiBearerAuth()
	@ApiOperation(<ApiOperationOptions>{
		summary: 'Logout for current user',
		description: 'Logout for current user, only if the user is logged in',
	})
	@UseGuards(JwtAuthGuard)
	async logout(@CurrentUser() user: UserDto): Promise<{ loggedout: boolean }> {
		const deleted = await this.authSevice.logout(user)
		return { loggedout: !!deleted }
	}

	@Post('/refresh')
	@ApiHeader(<ApiHeaderOptions>{
		name: 'x-refresh-token',
		description: 'The refresh token to exchange for new access token',
	})
	@UseGuards(JwtRefreshAuthGuard)
	async refreshToken(@CurrentUser() user: UserDto) {
		console.log(user)
		return await this.authSevice.exchangeSession(user)
	}
}
