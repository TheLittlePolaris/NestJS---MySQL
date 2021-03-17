import { BaseService } from '@/app-base/service/base.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { SessionRepository } from './entity-repository/session.entity-repository'
import { Session } from './entity/session.entity'

@Injectable()
export class SessionService extends BaseService<Session, SessionRepository> {
	constructor(private sessionRepository: SessionRepository) {
		super(sessionRepository)
	}

	public async validateSession(userEmail: string, sessionId: number, type: string | null) {
		const userSession = await this.sessionRepository.findOne({ id: sessionId })
		
		console.log(userSession, '<======= userSession [session.service.ts - 15]')
		


		if (userEmail !== userSession.email)
			throw new HttpException('Session data skewed!', HttpStatus.FORBIDDEN)

		if (Date.now() > userSession.refreshExpireAt) {
			if (type == null) {
				await this.sessionRepository.delete(sessionId)
				throw new HttpException('Session expited!', HttpStatus.NOT_ACCEPTABLE)
			}
			await this.updateOne(sessionId, { refreshExpireAt: new Date().setHours(72) })
		}

		return true
	}

	public async createSession(userEmail: string) {
		return await this.createRecord({ email: userEmail })
	}

	public async updateSession(sessionId: number, data: Partial<Session>) {
		return await this.updateOne(sessionId, data)
	}

	public async deleteSession(sessionId: number) {
		return await this.sessionRepository.delete(sessionId)
	}
}
