import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { readdir } from "fs/promises";
import * as yaml from "js-yaml";
import { JSONSchema, Options, compile } from "json-schema-to-typescript";
import { parse } from "path";

async function generate() {
	const directoryPath = "./src/schemas/models";
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
	const getOptions = (
		baseFile: string,
		dependencies: { imports: string; ajvSchema: string },
		schema: string,
		schemaName: string,
	): Partial<Options> => ({
		bannerComment: `/* eslint-disable */
		/**
		 * This file was automatically generated.
		 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
		 * 
		 * =>  @see ${baseFile}
		 * 
		 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
		 */

		import Ajv, { ErrorObject } from "ajv";
		import addFormats from "ajv-formats";
		
		 ${dependencies.imports}

		 export const schemaFor${schemaName} = ${schema};

		 export function validate${schemaName}(o : object): {isValid: boolean, errors: ErrorObject[]} {
			const ajv = new Ajv();
			addFormats(ajv);
			ajv.addKeyword("example");
			${dependencies.ajvSchema}
			const isValid = ajv.validate(schemaFor${schemaName}, o);
			const errors = ajv.errors || [];
			return { isValid, errors };
		  }
		`,
		additionalProperties: false,
		cwd: rootDirectory,
		declareExternallyReferenced: false,
	});
	const schemaPath = `${rootDirectory}/${className}.yml`;
	const schemaYaml = readFileSync(schemaPath, "utf8");
	const schema = (await yaml.load(schemaYaml)) as JSONSchema;

	const parsedDependencies = await findDependencies(className, rootDirectory);
	const dependencies = generateImportsAndAjvSchemeForDependency(parsedDependencies);
	const schemaDef = {
		$id: `${className}.yml`,
		...schema,
	};
	const options = getOptions(schemaPath, dependencies, JSON.stringify(schemaDef), className);
	const result = await compile(schema, className, options);
	const targetFolder = createFolder("./src/generated/models");
	const targetPath = `${targetFolder}/${className}.generated.ts`;
	writeFileSync(targetPath, cleanUpInterfaceNames(result));
}

/**
 * Removes the extra numbers from interface names.
 * example: "title?: TranslatableField1;" -> "title?: TranslatableField;"
 */
function cleanUpInterfaceNames(input: string) {
	const regex = /(\s?\S+:\s*[a-z]+)(\d+)(\[?\]?;)/gi;
	return input.replace(regex, "$1$3");
}

async function findDependencies(file: string, rootDirectory: string): Promise<string[]> {
	const foundDependencies: string[] = [];
	findDependenciesInSchema(file, rootDirectory, foundDependencies);
	return foundDependencies;
}

function findDependenciesInSchema(file: string, rootDirectory: string, foundDependencies: string[]): void {
	const schemaPath = `${rootDirectory}/${file}.yml`;
	const schemaYaml = readFileSync(schemaPath, "utf8");
	const regexForDependencies: RegExp = /(?<!^[\/])[A-Za-z]+(?=.yml)/g;
	const dependencies = new Set(schemaYaml.match(regexForDependencies));
	dependencies.forEach((dependency) => {
		if (!foundDependencies.includes(dependency)) {
			foundDependencies.push(dependency);
			findDependenciesInSchema(dependency, rootDirectory, foundDependencies);
		}
	});
}

function generateImportForDependency(dependency: string) {
	return dependency ? `import { ${dependency}, schemaFor${dependency} } from './${dependency}.generated';` : "";
}

function generateAjvSchemaForDependency(dependency: string) {
	return dependency ? `ajv.addSchema(schemaFor${dependency}, '${dependency}.yml');` : "";
}

function generateImportsAndAjvSchemeForDependency(dependencies: string[]) {
	let imports = "";
	let ajvSchema = "";
	dependencies.forEach((dependency) => {
		imports += "\n";
		imports += generateImportForDependency(dependency);
		ajvSchema += generateAjvSchemaForDependency(dependency);
		ajvSchema += "\n";
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
	`;
	const targetFolder = createFolder("./src/generated/faker");
	const targetPath = `${targetFolder}/faker.${className}.generated.ts`;
	writeFileSync(targetPath, faker);
}

function generateFakerRefsAndImportsForDependencies(dependencies: string[]) {
	let refs = "";
	let imports = "";
	dependencies.forEach((dependency) => {
		imports += "\n";
		imports += "\t" + generateFakerImportForDependency(dependency);
		refs += "\t" + "\t" + "\t" + generateFakerSchemaRefForDependency(dependency);
		refs += "\n";
	});
	return { refs: refs, imports: imports };
}

function generateFakerSchemaRefForDependency(dependency: string) {
	return dependency ? `schemaFor${dependency} as Schema,` : "";
}

function generateFakerImportForDependency(dependency: string) {
	return dependency ? `import { schemaFor${dependency} } from '../models/${dependency}.generated';` : "";
}

/**
 * Creates the folder with the given path, if it does not exist yet.
 */
function createFolder(folderPath: string) {
	if (!existsSync(folderPath)) {
		mkdirSync(folderPath, { recursive: true });
	}
	return folderPath;
}

generate();
