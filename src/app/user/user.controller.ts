import { CurrentUser } from '@/src/decorators/currentUser.decorator'
import { Roles } from '@/src/decorators/role.decorator'
import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiConsumes, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { RoleGuard } from '../auth/guards/role.guard'
import { USER_ROLE } from './constants/role.constant'
import { User } from './entity/user.entity'
import { UserService } from './user.service'

@Controller('user')
@ApiTags("User routes")
export class UserController {
	constructor(private userService: UserService) {}

	@Get('me')
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get current user' })
	@ApiResponse({ status: 401, description: 'Unauthenticated' })
	@ApiResponse({ status: 200, description: 'OK' })
	@UseGuards(JwtAuthGuard)
	async getMe(@CurrentUser() currentUser: User) {
		return currentUser
	}

	@Get()
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 401, description: 'Unauthenticated' })
	@ApiResponse({ status: 200, description: 'OK' })
	@UseGuards(JwtAuthGuard, RoleGuard)
	@Roles(USER_ROLE.SUPER_ADMIN)	
	async getAll() {
		return await this.userService.getAll()
	}
}
