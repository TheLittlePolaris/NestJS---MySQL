import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { BaseEntity } from 'typeorm'
import { EntityBase } from '../entity/base.entity'
import { BasePagination } from '../interfaces/pagination.interface'

export class BasePaginationDto implements BasePagination {
	@ApiProperty({ type: Number, required: false })
	skip?: number

	@ApiProperty({ type: Number, required: false })
	take?: number
}

export class BaseDto<T extends EntityBase> {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ type: Number })
	id: number

	@ApiProperty()
	createdAt: number

	@ApiProperty()
	updatedAt: number

	@ApiProperty()
	deleted: boolean

	@ApiProperty()
	deletedAt: number

	constructor(record: T) {
		const {id, createdAt, deleted, deletedAt, updatedAt} = record

		this.id = id
		this.createdAt = createdAt
		this.updatedAt = updatedAt
		this.deleted = deleted
		this.deletedAt = deletedAt
	}
}
