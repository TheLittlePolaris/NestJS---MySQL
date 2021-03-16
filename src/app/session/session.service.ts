import { BaseService } from '@/src/base/services/base.service'
import { Injectable } from '@nestjs/common'
import { SessionRepository } from './entity-repository/session.entity-repository'
import { Session } from './entity/session.entity'

@Injectable()
export class SessionService extends BaseService<Session, SessionRepository> {
	constructor(private sessionRepositoty: SessionRepository) {
		super(sessionRepositoty)
	}

  public validateSession(userEmail: string, sessionId: number) {
      
  }


}
