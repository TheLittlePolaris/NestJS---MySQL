import { ApiProperty } from '@nestjs/swagger'
import { UserDto } from '../../user/dto/user.dto'
import { User } from '../../user/entity/user.entity'

export class LoginDto {
	@ApiProperty({ required: true })
	email: string

	@ApiProperty({ required: true })
	password: string
}

export class AuthResponsePayload {
	@ApiProperty({ type: () => UserDto, nullable: false })
	user: UserDto

	@ApiProperty({ type: () => String, nullable: false })
	token: string

	@ApiProperty({ type: () => String, nullable: false })
	refreshToken: string
}

export class SignUpDto {}
