/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/Contact
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Contact, schemaForContact } from "../models/Contact.generated";


	export function fakeContact(useExamples: boolean, specifiedPropertiesForContact: object = {}): Contact {
		const schema = schemaForContact as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeContact: Contact = JSONSchemaFaker.generate(schema, refs) as Contact;
		// @ts-ignore
		const returnContact = { ...fakeContact, ...specifiedPropertiesForContact };
		return returnContact;
	}

	export function fakeContacts(useExamples: boolean, ...createContact: object[]) : Contact[] {
		const returnContacts : Contact[] = [];
		createContact.forEach(element => {
			returnContacts.push(fakeContact(useExamples, element));
		});
		return returnContacts;
	}
	