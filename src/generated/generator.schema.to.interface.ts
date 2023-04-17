import { writeFileSync, readFileSync } from 'fs';
import { readdir } from 'fs/promises';
import { parse } from 'path';
import { compile, JSONSchema } from 'json-schema-to-typescript';
import * as yaml from 'js-yaml';


async function generate() {
	const directoryPath = './src/schemas/models';

	let schemaFiles = await readdir(directoryPath);
	schemaFiles.forEach(async function (file) {
		const { name } = parse(file);

		await generateInterface(name);
		console.log(`generate interface for ${file}`);
	});

}

async function generateInterface(className: string, rootDirectory: string = './src/schemas/models') {
	const options = (baseFile: string, dependencies: { imports: string, ajvSchema: string }, schema: string, schemaName: string) => {
		return {
			bannerComment: `/* eslint-disable */
		/**
		 * This file was automatically generated by json-schema-to-typescript.
		 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
		 * 
		 * =>  @see ${baseFile}
		 * 
		 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
		 */

		import Ajv, { ValidateFunction } from "ajv";

		 ${dependencies.imports}

		 export const schemaFor${schemaName} = ${schema};

		 export function validate${schemaName}(o : object): {isValid: boolean, validate: ValidateFunction} {
			const ajv = new Ajv();
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

	const parsedDependencies = await parseDependenciesFrom(className, rootDirectory);
	const dependencies = generateImportsAndAjvSchemeForDependency(parsedDependencies);
	let schemaDef = {
		$id: `${className}.yml`,
		...schemaObject as object
	} 
	const targetType = await compile(schemaObject as JSONSchema, className, options(schemaPath, dependencies, JSON.stringify(schemaDef), className));
	const targetPath = `./src/generated/models/${className}.generated.ts`;

	writeFileSync(targetPath, targetType);
}


async function parseDependenciesFrom(file: string, rootDirectory: string): Promise<string[]> {
	const schemaPath = `${rootDirectory}/${file}.yml`;
	const schemaYaml = readFileSync(schemaPath, 'utf8');
	let regexForDependencies: RegExp = /(?<!^[\/])[A-Za-z]+(?=.yml)/g;
	const dependencies = new Set(schemaYaml.match(regexForDependencies));
	return [...dependencies];
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

generate();