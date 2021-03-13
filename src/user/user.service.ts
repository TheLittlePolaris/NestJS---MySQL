import { Injectable, OnModuleInit } from '@nestjs/common'
import { BasePagination } from '../base-config/interfaces/pagination.interface'
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
		return await this.usersRepository.find(pagination).catch(null)
	}

	public async updateUserById(id: number, updateUserData: UpdateUserDto) {
		return await this.usersRepository.updateOne(id, updateUserData)
	}

	public async updateUser(criteria: { [key in keyof UserDto]: any }, updateUserData: UpdateUserDto) {
		return await this.usersRepository.update(criteria, { ...updateUserData }).catch(null)
	}
}
