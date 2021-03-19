import { BaseService } from '@/app-base/service/base.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserDto } from '../user/dto/user.dto'
import { User } from '../user/entity/user.entity'
import { SessionRepository } from './entity-repository/session.entity-repository'
import { Session } from './entity/session.entity'

@Injectable()
export class SessionService extends BaseService<Session, SessionRepository> {
	constructor(private sessionRepository: SessionRepository) {
		super(sessionRepository)
	}

	public async validateSession(sessionId: number) {
		const userSession = await this.sessionRepository.getSessionWithUser(sessionId)
		if (!userSession) throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN)
		const {
			user: { password, ...userProperties },
		} = userSession
		return userProperties
	}

	public async createSession(userEmail: string, userId: number) {
		return await this.createAndSave({ email: userEmail, userId })
	}

	public async updateSession(sessionId: number, data: Partial<Session>) {
		return await this.updateOne(sessionId, data)
	}

	public async deleteSession({
		sessionId,
		user,
	}: { sessionId?: number; user?: User | UserDto } = {}) {
		if (!(sessionId || user)) throw new Error('Delete session ust have at least one criteria')
		return await this.sessionRepository.delete(sessionId || { userId: user.id })
	}
}
