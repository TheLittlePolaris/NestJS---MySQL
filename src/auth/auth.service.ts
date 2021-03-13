import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import { User } from '../user/entity/user.entity'

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

	public async signUp() {}

	public async signIn() {}

	public async createSession() {}

	public async updateSession() {}

	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.userService.findOne({ email })
		if (!user) throw new HttpException('Unauthenticated', HttpStatus.UNAUTHORIZED)
		if (await this.userService.comparePassword(pass, user.password)) {
			const { password, ...result } = user
			return result
		}
		return null
	}

	async login(user: User) {
		const payload = { email: user.email, userId: user.userId }
		return {
			token: this.jwtService.sign(payload),
		}
	}
}
