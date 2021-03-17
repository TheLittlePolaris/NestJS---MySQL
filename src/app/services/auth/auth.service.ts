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
		const { firstName, lastName, userId } = newUser
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
		const { email } = user
		const session = await this.sessionService.createRecord({
			email: email,
		})

		if (!session) throw new HttpException('Something went wrong!', HttpStatus.INTERNAL_SERVER_ERROR)

		const token = this.jwtService.sign({ email, sessionId: session.id }, <JwtSignOptions>{
			expiresIn: '15',
		})
		const refreshToken = this.jwtService.sign(
			{ email, sessionId: session.id, type: `R:${session.id}` },
			<JwtSignOptions>{ expiresIn: '72h' },
		)

		await this.updateSession(session.id, refreshToken)

		return { session, token, refreshToken }
	}

	public async updateSession(sessionId: number, refreshToken: string) {
		await this.sessionService.updateSession(sessionId, {
			refreshToken,
			refreshExpireAt: new Date().setHours(72),
		})
	}

	async validateUser(email: string, pass: string): Promise<UserDto | null> {
		const user = await this.userService.findOneUser({ email })
		console.log(user, "<====== validate User")
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
}
