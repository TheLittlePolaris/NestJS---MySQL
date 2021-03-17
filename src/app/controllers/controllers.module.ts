import { Module } from '@nestjs/common'
import { ServicesModule } from '../services/services.module'
import { AuthController } from './auth/auth.controller'
import { UserController } from './user/user.controller'

const controllers = [AuthController, UserController]

@Module({ imports: [ServicesModule], controllers })
export class ControllersModule {}
