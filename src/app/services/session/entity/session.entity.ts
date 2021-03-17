import { EntityBase } from '@/app-base/entity/base.entity'
import { Column, Entity } from 'typeorm'

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
