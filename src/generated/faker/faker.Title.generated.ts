
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Title, schemaForTitle } from "../models/Title.generated";


	export function fakeTitle(useExamples: boolean, specifiedPropertiesForTitle: object = {}): Title {
		const schema = schemaForTitle as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeTitle: Title = JSONSchemaFaker.generate(schema, refs) as Title;
		// @ts-ignore
		const returnTitle = { ...fakeTitle, ...specifiedPropertiesForTitle };
		return returnTitle;
	}

	export function fakeTitles(useExamples: boolean, ...createTitle: object[]) : Title[] {
		const returnTitles : Title[] = [];
		createTitle.forEach(element => {
			returnTitles.push(fakeTitle(useExamples, element));
		});
		return returnTitles;
	}
	