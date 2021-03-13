import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common'
import { BasePagination } from '../base/interfaces/pagination.interface'
import { CreateUserDto, UpdateUserDto, UserDto } from './dto/user.dto'
import { User } from './entity/user.entity'
import { UserRepository } from './entity-repo/user.entity-repo'

@Injectable()
export class UserService implements OnModuleInit {
	constructor(private usersRepository: UserRepository) {}

	async onModuleInit() {}

	async createUser(userData: CreateUserDto) {
		return await this.usersRepository.createAndSave(userData)
	}

	async getAll(pagination: BasePagination = {}) {
		const results = await this.usersRepository.find(pagination).catch(null)
		if (!results) throw new HttpException('NotFound', HttpStatus.NOT_FOUND)
		return results
	}

	public async findOne(criteria: { [key in keyof UserDto]?: any }) {
		return await this.usersRepository.findOne({ where: criteria })
	}

	public async updateUserById(id: number, updateUserData: UpdateUserDto) {
		return await this.usersRepository.updateOne(id, updateUserData)
	}

	public async updateUser(criteria: { [key in keyof UserDto]: any }, updateUserData: UpdateUserDto) {
		return await this.usersRepository.update(criteria, { ...updateUserData }).catch(null)
	}

	public async deleteUser(id: number) {
		return await this.usersRepository.delete(id)
	}

	public async comparePassword(password: string, userPassword: string) {
		return await this.usersRepository.verifyPassword(password, userPassword)
	}
}
