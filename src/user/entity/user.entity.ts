import { EntityBase } from '@/src/base-config/entity/base.entity'
import { USER_ENTITY } from '@/src/constants'
import { nanoid } from 'nanoid'
import { Column, Entity } from 'typeorm'

@Entity()
export class User extends EntityBase {
	@Column({ unique: true, default: nanoid(10) })
	userId: string

	@Column({ type: 'varchar' })
	email: string

	@Column({ type: 'char', length: 64, select: false })
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