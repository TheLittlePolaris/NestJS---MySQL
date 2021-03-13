import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './entity-repo/user.entity-repo'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	imports: [TypeOrmModule.forFeature([UserRepository])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
