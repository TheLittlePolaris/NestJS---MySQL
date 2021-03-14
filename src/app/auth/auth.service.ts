import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '@/src/app/user/user.service'
import { User } from '../user/entity/user.entity'
import { CreateUserDto, UserDto } from '../user/dto/user.dto'
import { LoginDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

	public async signUp(userData: CreateUserDto) {
		const { email } = userData
		const existedUser = await this.userService.findOne({ email })
		if (!!existedUser) throw new HttpException('User Existed', HttpStatus.BAD_REQUEST)
		const newUser = await this.userService.createUser(userData)
		return this.signUser(new UserDto(newUser))
	}

	public async signIn(data: LoginDto) {
		const { email, password } = data
		const validated = await this.validateUser(email, password)
		if (!validated) throw new HttpException('User not exists', HttpStatus.NOT_FOUND)
		return this.signUser(validated)
	}

	public async createSession() {}

	public async updateSession() {}

	async validateUser(email: string, pass: string): Promise<UserDto | null> {
		const user = await this.userService.findOne({ email })
		if (!user) throw new HttpException('Unauthenticated', HttpStatus.UNAUTHORIZED)
		if (await this.userService.comparePassword(pass, user.password)) {
			const { password, ...result } = user
			return result
		}
		return null
	}

	async signUser(user: UserDto) {
		const { email, userId } = user
		return {
			token: this.jwtService.sign({ email, userId }),
			user,
		}
	}
}
