import { ApiProperty } from '@nestjs/swagger'
import { BasePagination } from '../interfaces/pagination.interface'

export class BasePaginationDto implements BasePagination {
	@ApiProperty({ type: Number, required: false })
	skip?: number

	@ApiProperty({ type: Number, required: false })
	take?: number
}
