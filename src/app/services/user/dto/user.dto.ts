import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { USER_ROLE } from '../constants/role.constant'
import { User } from '../entity/user.entity'

export class UserDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ type: Number })
	id: number

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ type: String })
	userId: string

	@IsEnum(USER_ROLE)
	@IsArray()
	@ValidateNested()
	@IsNotEmpty()
	@ApiProperty({ enum: USER_ROLE, default: [USER_ROLE.NORMAL_USER] })
	roles: USER_ROLE[]

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ required: true })
	email: string

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ required: true })
	firstName: string

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ required: true })
	lastName: string

	@IsString()
	@ApiProperty({ required: false })
	fullName: string

	// @IsString()
	// @IsNotEmpty()
	// @ApiProperty({ required: true })
	// password: string

	@ApiProperty({ default: true })
	isActive: boolean

	constructor(userData: UserDto | User) {
		const { id, userId, email, firstName, lastName, fullName } = userData

		this.id = id
		this.userId = userId
		this.email = email
		this.firstName = firstName
		this.lastName = lastName
		this.fullName = fullName
	}
}

export class CreateUserDto
	implements Omit<UserDto, 'isActive' | 'id' | 'fullName' | 'userId' | 'roles'> {
	@ApiProperty({ required: true })
	email: string

	@ApiProperty({ required: true })
	firstName: string

	@ApiProperty({ required: true })
	lastName: string

	@ApiProperty({ required: true })
	password: string

	constructor() {}
}

export class UpdateUserDto {
	@ApiProperty({ required: false })
	email?: string

	@ApiProperty({ required: false })
	firstName?: string

	@ApiProperty({ required: false })
	lastName?: string

	// @ApiProperty({ required: false })
	// password?: string

	constructor() {}
}
