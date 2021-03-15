import { EntityBaseRepository } from '@/src/base/entity-repository/base.entity-repository'
import { nanoid } from 'nanoid'
import { EntityRepository } from 'typeorm'
import { CreateUserDto } from '../dto/user.dto'
import { User } from '../entity/user.entity'
import { hash, verify } from '../helper/user.helper'

@EntityRepository(User)
export class UserRepository extends EntityBaseRepository<User> {
	public async createAndSave(userData: CreateUserDto) {
		const { password, firstName, lastName } = userData
		const hashed = await this.createHash(password)
		const fullName = `${firstName} ${lastName}`
		const userId = nanoid(10)
		const newEntity = await this.save({ ...userData, password: hashed, userId, fullName })
		return newEntity
	}

	public async createHash(input: string) {
		return await hash(input)
	}

	public async verifyPassword(input: string, hashedPassword: string) {
		return await verify(input, hashedPassword)
	}
}
