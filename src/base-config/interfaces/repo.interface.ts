import { FindConditions, ObjectID, ObjectLiteral } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export interface Entity extends ObjectLiteral {}

export type UpdateCritetia =
	| string
	| string[]
	| number
	| number[]
	| Date
	| Date[]
	| ObjectID
	| ObjectID[]
	| FindConditions<Entity>
    
export type UpdateData = QueryDeepPartialEntity<Entity>
