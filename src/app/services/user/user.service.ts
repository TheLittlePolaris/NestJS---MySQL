import { BaseService } from '@/app-base/service/base.service'
import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common'
import { BasePagination } from '../../../app-base/interfaces/pagination.interface'
import { CreateUserDto, UpdateUserDto, UserDto } from './dto/user.dto'
import { UserRepository } from './entity-repository/user.entity-repository'
import { User } from './entity/user.entity'

@Injectable()
export class UserService extends BaseService<User, UserRepository> implements OnModuleInit {
	constructor(private usersRepository: UserRepository) {
		super(usersRepository)
	}

	async onModuleInit() {
		// const user = this.usersRepository.create({
		// 	email: 'polarisu1999@gmail.com',
		// 	roles: [USER_ROLE.SUPER_ADMIN],
		// 	password: await hash('123456'),
		// 	firstName: 'The Litle',
		// 	lastName: 'Polarisu',
		// 	fullName: 'The Little Poalrisu',
		// 	userId: nanoid(10),
		// })
		// console.log(user)
		// await this.usersRepository.save(user)
		// await this.usersRepository.updateOne(1, { roles: [USER_ROLE.SUPER_ADMIN] })
		// const saved = await this.findOneUser({ email: 'polarisu1999@gmail.com' })
		// console.log(saved)
	}

	async createUser(userData: CreateUserDto) {
		return await this.usersRepository.createAndSave(userData)
	}

	async getAll(pagination: BasePagination = {}) {
		const results = await this.usersRepository.find(pagination).catch(null)
		if (!results) throw new HttpException('NotFound', HttpStatus.NOT_FOUND)
		return results
	}

	public async findOneUser(criteria: { [key in keyof UserDto]?: any }) {
		return await this.findOne(criteria)
	}

	public async updateUserById(id: number, updateUserData: UpdateUserDto) {
		return await this.updateOne(id, updateUserData)
	}

	public async updateUser(criteria: { [key in keyof UserDto]: any }, updateUserData: UpdateUserDto) {
		return await this.update(criteria, updateUserData).catch(null)
	}

	public async deleteUser(id: number) {
		return await this.deleteById(id)
	}

	public async comparePassword(password: string, userPassword: string) {
		return await this.usersRepository.verifyPassword(password, userPassword)
	}
}
