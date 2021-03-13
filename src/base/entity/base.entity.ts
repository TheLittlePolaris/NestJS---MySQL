import { Column, PrimaryGeneratedColumn } from 'typeorm'

export abstract class EntityBase {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'bigint', default: Date.now() })
	createdAt: number

	@Column({ type: 'bigint', default: Date.now() })
	updatedAt: number

	@Column({ type: 'boolean', default: false })
	deleted: boolean

	@Column({ type: 'bigint', default: null, nullable: true })
	deletedAt: number
}
