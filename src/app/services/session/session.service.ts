import { BaseService } from '@/app-base/service/base.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserDto } from '../user/dto/user.dto'
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
			user: { password, ...result },
		} = userSession
		return result
	}

	public async createSession(userEmail: string, userId: number) {
		return await this.createAndSave({ email: userEmail, userId })
	}

	public async updateSession(sessionId: number, data: Partial<Session>) {
		return await this.updateOne(sessionId, data)
	}

	public async deleteSession(sessionId: number) {
		return await this.sessionRepository.delete(sessionId)
	}
}
