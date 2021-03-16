import { EntityBase } from '@/src/base/entity/base.entity'
import { Column, Entity } from 'typeorm'
import { USER_ROLE } from '../../user/constants/role.constant'

@Entity()
export class Session extends EntityBase {
	constructor() {
		super()
	}

	@Column({ type: 'varchar', nullable: false })
	email: string

	@Column({ type: 'varchar', nullable: false })
	refreshToken: string

  @Column({ type: 'bigint', nullable: false  })
  refreshExpireAt: number
}
