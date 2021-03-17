import { Session } from 'node:inspector';
import { USER_ROLE } from '../../user/constants/role.constant'
import { User } from '../../user/entity/user.entity';

export interface ISession extends Session {
	user?: User
}
