import { EntityBaseRepository } from '@/app-base/entity-repository/base.entity-repository'
import { EntityManager, EntityRepository } from 'typeorm'
import { UserDto } from '../../user/dto/user.dto'
import { User } from '../../user/entity/user.entity'
import { Session } from '../entity/session.entity'
import { ISession } from '../interfaces/session.interface'

@EntityRepository(Session)
export class SessionRepository extends EntityBaseRepository<Session> {
	constructor(private entityManager: EntityManager) {
		super()
	}

	public async getUserByEmail(email: string) {
		// return await this.connection.getRepository('User').findOne({ email })
	}

	public async getSessionWithUser(id: number): Promise<ISession> {
		const session = (await this.entityManager
			.createQueryBuilder(Session, 'session')
			.where('session.id = :id and session.deleted = :status', { id, status: false })
			.leftJoinAndMapOne('session.user', User, 'user', 'session.userId = user.id')
			.getOne()) as any

		return session
	}
}
