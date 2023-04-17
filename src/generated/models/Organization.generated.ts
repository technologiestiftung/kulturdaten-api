/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Organization.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";

import {Description, schemaForDescription} from "./Description.generated";

export const schemaForOrganization = {
  $id: "Organization.yml",
  type: "object",
  properties: {
    identifier: {type: "string"},
    name: {type: "string", examples: ["Kleine Bühne"]},
    description: {$ref: "Description.yml"},
    createdAt: {type: "string"},
    updatedAt: {type: "string"}
  },
  required: ["identifier", "name"]
};

export function validateOrganization(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  ajv.addKeyword("example");
  ajv.addSchema(schemaForDescription, "Description.yml");

  const validate = ajv.compile(schemaForOrganization);
  return {isValid: validate(o), validate: validate};
}

export interface Organization {
  identifier: string;
  name: string;
  description?: Description;
  createdAt?: string;
  updatedAt?: string;
}
