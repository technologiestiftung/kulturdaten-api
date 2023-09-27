import { writeFileSync, readFileSync } from 'fs';
import { readdir } from 'fs/promises';
import { parse } from 'path';
import { compile, JSONSchema } from 'json-schema-to-typescript';
import * as yaml from 'js-yaml';

// TODO: Refactor young padawan.

async function generate() {
	const directoryPath = './src/schemas/models';
	const schemaFiles = await readdir(directoryPath);
	schemaFiles.forEach(async function (file) {
		const { name } = parse(file);
		await generateInterface(name, directoryPath);
		console.log(`generate interface for ${file}`);
		await generateFaker(name, directoryPath);
		console.log(`generate test faker for ${file}`);
	});

}

async function generateInterface(className: string, rootDirectory: string) {
	const options = (baseFile: string, dependencies: { imports: string, ajvSchema: string }, schema: string, schemaName: string) => {
		return {
			bannerComment: `/* eslint-disable */
		/**
		 * This file was automatically generated.
		 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
		 * 
		 * =>  @see ${baseFile}
		 * 
		 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
		 */

		import Ajv, { ValidateFunction } from "ajv";
		import addFormats from "ajv-formats";
		
		 ${dependencies.imports}

		 export const schemaFor${schemaName} = ${schema};

		 export function validate${schemaName}(o : object): {isValid: boolean, validate: ValidateFunction} {
			const ajv = new Ajv();
			addFormats(ajv);
			ajv.addKeyword("example");
			${dependencies.ajvSchema}
			const validate = ajv.compile(schemaFor${schemaName});
			return {isValid: validate(o), validate: validate};
		  }
		`,
			additionalProperties: false,
			cwd: rootDirectory,
			declareExternallyReferenced: false,
		}
	};
	const schemaPath = `${rootDirectory}/${className}.yml`;
	const schemaYaml = readFileSync(schemaPath, 'utf8');
	const schemaObject = await yaml.load(schemaYaml);

	const parsedDependencies = await findDependencies(className, rootDirectory);
	const dependencies = generateImportsAndAjvSchemeForDependency(parsedDependencies);
	let schemaDef = {
		$id: `${className}.yml`,
		...schemaObject as object
	} 
	const targetType = await compile(schemaObject as JSONSchema, className, options(schemaPath, dependencies, JSON.stringify(schemaDef), className));
	const targetPath = `./src/generated/models/${className}.generated.ts`;

	writeFileSync(targetPath, targetType);
}


async function findDependencies(file: string, rootDirectory: string) : Promise<string[]> {
	const foundDependencies: string[] = [];
	findDependenciesInSchema(file, rootDirectory, foundDependencies);
	return foundDependencies;
}


function findDependenciesInSchema(file: string, rootDirectory: string, foundDependencies: string[]) : void {
	const schemaPath = `${rootDirectory}/${file}.yml`;
	const schemaYaml = readFileSync(schemaPath, 'utf8');
	let regexForDependencies: RegExp = /(?<!^[\/])[A-Za-z]+(?=.yml)/g;
	
	const dependencies = new Set(schemaYaml.match(regexForDependencies));
	dependencies.forEach(dependency => {
		if (!foundDependencies.includes(dependency)) {
			foundDependencies.push(dependency);
			findDependenciesInSchema(dependency, rootDirectory, foundDependencies);
		  }
	});
}

function generateImportForDependency(dependency: string) {
	return dependency ? `import { ${dependency}, schemaFor${dependency} } from './${dependency}.generated';` : '';
}

function generateAjvSchemaForDependency(dependency: string) {
	return dependency ? `ajv.addSchema(schemaFor${dependency}, '${dependency}.yml');` : '';
}

function generateImportsAndAjvSchemeForDependency(dependencies: string[]) {
	let imports = '';
	let ajvSchema = '';
	dependencies.forEach(dependency => {
		imports += '\n';
		imports += generateImportForDependency(dependency);
		ajvSchema += generateAjvSchemaForDependency(dependency);
		ajvSchema += '\n';
	});
	return { imports: imports, ajvSchema: ajvSchema };
}


async function generateFaker(className: string, rootDirectory: string) {

	const parsedDependencies = await findDependencies(className, rootDirectory);

	const dependencies = generateFakerRefsAndImportsForDependencies(parsedDependencies);

	const faker = `/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ${rootDirectory}/${className}
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { ${className}, schemaFor${className} } from "../models/${className}.generated";
${dependencies.imports}

	export function fake${className}(useExamples: boolean, specifiedPropertiesFor${className}: object = {}): ${className} {
		const schema = schemaFor${className} as Schema;
		const refs : Schema[] = [
${dependencies.refs}
		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fake${className}: ${className} = JSONSchemaFaker.generate(schema, refs) as ${className};
		// @ts-ignore
		const return${className} = { ...fake${className}, ...specifiedPropertiesFor${className} };
		return return${className};
	}

	export function fake${className}s(useExamples: boolean, ...create${className}: object[]) : ${className}[] {
		const return${className}s : ${className}[] = [];
		create${className}.forEach(element => {
			return${className}s.push(fake${className}(useExamples, element));
		});
		return return${className}s;
	}
	`

	const targetPath = `./src/generated/faker/faker.${className}.generated.ts`;
	writeFileSync(targetPath, faker);
}

function generateFakerRefsAndImportsForDependencies(dependencies: string[]){
	let refs = '';
	let imports = '';
	dependencies.forEach(dependency => {
		imports += '\n';
		imports += '\t' + generateFakerImportForDependency(dependency);
		refs += '\t' + '\t' + '\t'+ generateFakerSchemaRefForDependency(dependency);
		refs += '\n';
	});

	return { refs: refs, imports: imports };
}

function generateFakerSchemaRefForDependency(dependency: string) {
	return dependency ? `schemaFor${dependency} as Schema,` : '';
}

function generateFakerImportForDependency(dependency: string) {
	return dependency ? `import { schemaFor${dependency} } from '../models/${dependency}.generated';` : '';
}

generate();
