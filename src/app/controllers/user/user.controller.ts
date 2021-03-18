import { CurrentUser } from '@/decorators/current-user.decorator'
import { Roles } from '@/decorators/role.decorator'
import { Controller, Get, UseGuards } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { JwtAuthGuard } from '../../services/auth/guards/jwt.guard'
import { RoleGuard } from '../../services/auth/guards/role.guard'
import { USER_ROLE } from '../../services/user/constants/role.constant'
import { User } from '../../services/user/entity/user.entity'
import { UserService } from '../../services/user/user.service'

@Controller('user')
@ApiTags('User routes')
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
