import { BaseEntityRepo } from '@/src/base-config/repo/base.entity-repo'
import { EntityRepository } from 'typeorm'
import { CreateUserDto } from '../dto/user.dto'
import { User } from '../entity/user.entity'
import { hash, verify } from '../helper/user.helper'

@EntityRepository(User)
export class UserRepository extends BaseEntityRepo<User> {
	public async createAndSave(userData: CreateUserDto) {
		const { password, firstName, lastName } = userData
		const hashed = await this.createHash(password)
		const fullName = `${firstName} ${lastName}`
		const newEntity = await this.save({ ...userData, password: hashed, fullName })
		return newEntity
	}

	public async createHash(input: string) {
		return await hash(input)
	}

	public async verifyPassword(input: string, hashedPassword: string) {
		return await verify(input, hashedPassword)
	}
}
