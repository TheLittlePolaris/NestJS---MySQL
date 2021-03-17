import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { CreateUserDto, UserDto } from '../user/dto/user.dto'
import { LoginDto } from './dto/auth.dto'
import { SessionService } from '../session/session.service'
import { User } from '../user/entity/user.entity'
import { UserService } from '../user/user.service'
import { MicroserviceService } from '@/microservice/microservice.service'
import { AppConfigService } from '@/app/app-config/app-config.service'

@Injectable()
export class AuthService {
	constructor(
		private readonly appConfigService: AppConfigService,
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly microService: MicroserviceService,
		private readonly sessionService: SessionService,
	) {}

	public async signUp(userData: CreateUserDto) {
		const { email } = userData
		const existedUser = await this.userService.findOneUser({ email })
		if (!!existedUser) throw new HttpException('User Existed', HttpStatus.BAD_REQUEST)
		const newUser = await this.userService.createUser(userData)
		// demo of using a micro service to send email to new user
		// this.microService.sendMail({ mailTemplateName: 'WelcomeUser', firstName, lastName, userId })
		return this.signUser(new UserDto(newUser))
	}

	public async signIn(data: LoginDto) {
		const { email, password } = data
		const validated = await this.validateUser(email, password)
		if (!validated) throw new HttpException('User not exists', HttpStatus.NOT_FOUND)
		return this.signUser(validated)
	}

	public async createSession(user: User | UserDto) {
		const { email, id } = user
		const session = await this.sessionService.createAndSave({
			email: email,
			userId: id,
			refreshToken: '',
		})

		console.log(session)

		if (!session) throw new HttpException('Something went wrong!', HttpStatus.INTERNAL_SERVER_ERROR)

		const token = this.getAccessToken('access', { email, sessionId: session.id })
		const refreshToken = this.getAccessToken('refresh', { email, sessionId: session.id })

		await this.updateSession(session.id, refreshToken)
		return { session, token, refreshToken }
	}

	private getAccessToken(
		type: 'access' | 'refresh',
		payload: { email: string; sessionId: number },
	) {
		const config =
			type === 'access'
				? {
						expiresIn: this.appConfigService.jwtAccessDuration,
						secret: this.appConfigService.jwtAccessSecret,
				  }
				: {
						expiresIn: this.appConfigService.jwtRefreshDuration,
						secret: this.appConfigService.jwtRefreshSecret,
				  }
		return this.jwtService.sign(payload, config)
	}

	public async updateSession(sessionId: number, refreshToken: string) {
		return await this.sessionService.updateSession(sessionId, {
			refreshToken,
		})
	}

	async validateUser(email: string, pass: string): Promise<UserDto | null> {
		const user = await this.userService.findOneUser({ email })
		if (!user) throw new HttpException('Unauthenticated', HttpStatus.UNAUTHORIZED)
		if (await this.userService.comparePassword(pass, user.password)) {
			const { password, ...result } = user
			return result
		}
		return null
	}

	async signUser(user: UserDto) {
		const { token, refreshToken } = await this.createSession(user)

		return {
			token,
			refreshToken,
			user,
		}
	}

	async exchangeSession(currentUser: UserDto, refreshToken?: string) {
		const currentSession = await this.sessionService.findOne({
			email: currentUser.email,
			deleted: false,
		})
		await this.sessionService.updateSession(currentSession.id, {
			deleted: true,
			deletedAt: Date.now(),
		})

		return await this.signUser(currentUser)
	}
}
