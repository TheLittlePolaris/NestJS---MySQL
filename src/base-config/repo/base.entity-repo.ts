import { EntityRepository, Repository, UpdateResult } from 'typeorm'
import { EntityBase } from '../entity/base.entity'

@EntityRepository()
export class BaseEntityRepo<T extends EntityBase> extends Repository<T> {
	constructor() {
		super()
	}

	update(criteria: any, data: any): Promise<UpdateResult> {
		data = { ...data, updatedAt: Date.now() }
		return super.update(criteria, data)
	}
}
