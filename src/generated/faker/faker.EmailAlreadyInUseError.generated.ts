
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { EmailAlreadyInUseError, schemaForEmailAlreadyInUseError } from "../models/EmailAlreadyInUseError.generated";


	export function fakeEmailAlreadyInUseError(specifiedPropertiesForEmailAlreadyInUseError: object = {}): EmailAlreadyInUseError {
		const schema = schemaForEmailAlreadyInUseError as Schema;
		const refs : Schema[] = [

		];
		// @ts-ignore
		const fakeEmailAlreadyInUseError: EmailAlreadyInUseError = JSONSchemaFaker.generate(schema, refs) as EmailAlreadyInUseError;
		// @ts-ignore
		const returnEmailAlreadyInUseError = { ...fakeEmailAlreadyInUseError, ...specifiedPropertiesForEmailAlreadyInUseError };
		return returnEmailAlreadyInUseError;
	}

	export function fakeEmailAlreadyInUseErrors(...createEmailAlreadyInUseError: object[]) : EmailAlreadyInUseError[] {
		const returnEmailAlreadyInUseErrors : EmailAlreadyInUseError[] = [];
		createEmailAlreadyInUseError.forEach(element => {
			returnEmailAlreadyInUseErrors.push(fakeEmailAlreadyInUseError(element));
		});
		return returnEmailAlreadyInUseErrors;
	}
	