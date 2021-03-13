import { Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

    public async signUp() {}

    public async signIn() {}

	public async createSession() {}

	public async updateSession() {}
}
