import { EntityBase } from '@/src/base/entity/base.entity'
import { USER_ENTITY } from '@/src/constants'
import { Column, Entity } from 'typeorm'
import { USER_ROLE } from '../constants/role.constant'

@Entity()
export class User extends EntityBase {
	@Column({ type: 'varchar', unique: true })
	userId: string

	@Column({
		type: 'set',
		enum: [USER_ROLE.NORMAL_USER, USER_ROLE.SUPER_ADMIN],
		default: [USER_ROLE.NORMAL_USER],
	})
	roles: USER_ROLE[]

	@Column({ type: 'varchar' })
	email: string

	@Column({ type: 'char', length: 64 })
	password: string

	@Column({ type: 'varchar' })
	firstName: string

	@Column({ type: 'varchar', length: 100, nullable: true })
	fullName: string

	@Column({ type: 'varchar', length: 50 })
	lastName: string

	@Column({ type: 'boolean', default: true })
	isActive: boolean
}
