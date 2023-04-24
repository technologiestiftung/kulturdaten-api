
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { NotFoundError, schemaForNotFoundError } from "../models/NotFoundError.generated";


	export function fakeNotFoundError(specifiedPropertiesForNotFoundError: object = {}): NotFoundError {
		const schema = schemaForNotFoundError as Schema;
		const refs : Schema[] = [

		];
		// @ts-ignore
		const fakeNotFoundError: NotFoundError = JSONSchemaFaker.generate(schema, refs) as NotFoundError;
		// @ts-ignore
		const returnNotFoundError = { ...fakeNotFoundError, ...specifiedPropertiesForNotFoundError };
		return returnNotFoundError;
	}

	export function fakeNotFoundErrors(...createNotFoundError: object[]) : NotFoundError[] {
		const returnNotFoundErrors : NotFoundError[] = [];
		createNotFoundError.forEach(element => {
			returnNotFoundErrors.push(fakeNotFoundError(element));
		});
		return returnNotFoundErrors;
	}
	