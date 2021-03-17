import { EntityBase } from '@/app-base/entity/base.entity'
import { Column, Entity } from 'typeorm'
import { User } from '../../user/entity/user.entity'

@Entity()
export class Session extends EntityBase {
	constructor() {
		super()
	}

	@Column({ type: 'varchar', nullable: false })
	email: string

	@Column({ type: 'int', nullable: false })
	userId

	@Column({ type: 'varchar', nullable: false })
	refreshToken: string
}
