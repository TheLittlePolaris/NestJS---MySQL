import { HttpException, HttpStatus } from '@nestjs/common'
import { DeepPartial } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { EntityBase } from '../entity/base.entity'
import { BasePagination } from '../interfaces/pagination.interface'
import { BaseEntityRepo } from '../repo/base.entity-repo'

export abstract class BaseService<T extends EntityBase, K extends BaseEntityRepo<T>> {
	constructor(private repository: K) {}

	async createRecord(data: DeepPartial<T>) {
		return await this.repository.create(data)
	}

	async getAll(pagination: BasePagination = {}) {
		const results = await this.repository.find(pagination).catch(null)
		if (!results) throw new HttpException('NotFound', HttpStatus.NOT_FOUND)
		return results
	}

	public async findOne(criteria: { [key in keyof DeepPartial<T>]?: any }) {
		return await this.repository.findOne({ where: criteria })
	}

	public async updateOne<T>(id: number, updateData: { [P in keyof T]?: T[P] }) {
		return await this.repository.updateOne(id, updateData)
	}

	public async update(
		criteria: { [key in keyof DeepPartial<T>]: any },
		updateData: QueryDeepPartialEntity<T>,
	) {
		return await this.repository.update(criteria, updateData).catch(null)
	}

	public async deleteById(id: number) {
		return await this.repository.delete(id)
	}
}
