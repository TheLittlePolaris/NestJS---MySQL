import { ApiResponseMetadata, ApiResponseOptions } from '@nestjs/swagger'
import { omit, isArray } from 'lodash'

export function ApiResponses(options: ApiResponseOptions[]): MethodDecorator & ClassDecorator {
	const mappedGroupMetaData = options.reduce((allOptions, currOption) => {
		const [type, isArray] = getTypeIsArrayTuple(
			(currOption as ApiResponseMetadata).type,
			(currOption as ApiResponseMetadata).isArray,
		)

		;(currOption as ApiResponseMetadata).type = type
		;(currOption as ApiResponseMetadata).isArray = isArray
		currOption.description = currOption.description ? currOption.description : ''

		return { ...allOptions, [currOption.status]: omit(currOption, 'status') }
	}, {})

	return (
		target: object,
		key?: string | symbol,
		descriptor?: TypedPropertyDescriptor<any>,
	): any => {
		if (descriptor) {
			const responses = Reflect.getMetadata(DECORATORS.API_RESPONSE, descriptor.value) || {}
			Reflect.defineMetadata(
				DECORATORS.API_RESPONSE,
				{
					...responses,
					...mappedGroupMetaData,
				},
				descriptor.value,
			)
			return descriptor
		}
		const responses = Reflect.getMetadata(DECORATORS.API_RESPONSE, target) || {}
		Reflect.defineMetadata(
			DECORATORS.API_RESPONSE,
			{
				...responses,
				...mappedGroupMetaData,
			},
			target,
		)
		return target
	}
}

export const DECORATORS_PREFIX = 'swagger'
export const DECORATORS = {
	API_OPERATION: `${DECORATORS_PREFIX}/apiOperation`,
	API_RESPONSE: `${DECORATORS_PREFIX}/apiResponse`,
	API_PRODUCES: `${DECORATORS_PREFIX}/apiProduces`,
	API_CONSUMES: `${DECORATORS_PREFIX}/apiConsumes`,
	API_TAGS: `${DECORATORS_PREFIX}/apiUseTags`,
	API_PARAMETERS: `${DECORATORS_PREFIX}/apiParameters`,
	API_HEADERS: `${DECORATORS_PREFIX}/apiHeaders`,
	API_MODEL_PROPERTIES: `${DECORATORS_PREFIX}/apiModelProperties`,
	API_MODEL_PROPERTIES_ARRAY: `${DECORATORS_PREFIX}/apiModelPropertiesArray`,
	API_SECURITY: `${DECORATORS_PREFIX}/apiSecurity`,
	API_EXCLUDE_ENDPOINT: `${DECORATORS_PREFIX}/apiExcludeEndpoint`,
	API_EXTRA_MODELS: `${DECORATORS_PREFIX}/apiExtraModels`,
	API_EXTENSION: `${DECORATORS_PREFIX}/apiExtension`,
}

export function getTypeIsArrayTuple(
	input: Function | [Function] | undefined | string | Record<string, any>,
	isArrayFlag: boolean,
): [Function | undefined, boolean] {
	if (!input) {
		return [input as undefined, isArrayFlag]
	}
	if (isArrayFlag) {
		return [input as Function, isArrayFlag]
	}
	const isInputArray = isArray(input)
	const type = isInputArray ? input[0] : input
	return [type, isInputArray]
}
