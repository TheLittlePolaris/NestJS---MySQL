import { FindConditions, ObjectID, ObjectLiteral } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export type Entity = ObjectLiteral

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

export type BaseFields = 	"createdAt" | "updatedAt" | "deleted" | "deletedAt"

