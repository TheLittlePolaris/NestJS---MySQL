import { EntityRepository, Repository, UpdateResult } from 'typeorm'
import { EntityBase } from '../entity/base.entity'

@EntityRepository()
export class BaseEntityRepo<T extends EntityBase> extends Repository<T> {
	constructor() {
		super()
	}

	async updateMany(
		criteria: { [key in keyof T]: any },
		data: { [key in keyof T]: any },
	): Promise<UpdateResult> {
		data = { ...data, updatedAt: Date.now() }
		return super.update(criteria, data)
	}

	async updateOne<T>(criteria: any, data: { [K in keyof T]: any }): Promise<T> {
		const record = await super.findOne(criteria, data)
		if (!record) return null
		Object.keys(data).map((k) => {
			if (k in record && data[k]) record[k] = data[k]
		})
		record.updatedAt = Date.now()
		return await super.save(record as any)
	}
}
