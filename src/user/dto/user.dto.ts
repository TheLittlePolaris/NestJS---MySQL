import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UserDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ type: Number })
	id: number

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ type: String })
	userId: string

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

	constructor() {}
}

export class CreateUserDto implements Omit<UserDto, 'isActive' | 'id' | 'fullName' | 'userId'> {
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

	@ApiProperty({ required: false })
	password?: string

	constructor() {}
}
