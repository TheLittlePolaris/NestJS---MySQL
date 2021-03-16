import { USER_ROLE } from '../../user/constants/role.constant'

export interface ISession {
	is: number
	email: string
	roles: USER_ROLE[]
}
