import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SessionRepository } from './entity-repository/session.entity-repository'
import { SessionService } from './session.service'

@Module({
	imports: [TypeOrmModule.forFeature([SessionRepository])],
	providers: [SessionService],
	exports: [SessionService],
})
export class SessionModule {}
