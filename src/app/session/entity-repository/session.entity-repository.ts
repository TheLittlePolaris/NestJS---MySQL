import { EntityBaseRepository } from '@/src/base/entity-repository/base.entity-repository'
import { EntityRepository } from 'typeorm'
import { Session } from '../entity/session.entity'

@EntityRepository(Session)
export class SessionRepository extends EntityBaseRepository<Session> {
	constructor() {
		super()
	}

}
