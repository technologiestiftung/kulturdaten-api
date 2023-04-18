/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/PatchOrganization.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Description, schemaForDescription} from "./Description.generated";

export const schemaForPatchOrganization = {
  $id: "PatchOrganization.yml",
  type: "object",
  additionalProperties: false,
  properties: {name: {type: "string"}, description: {$ref: "Description.yml"}}
};

export function validatePatchOrganization(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addSchema(schemaForDescription, "Description.yml");

  const validate = ajv.compile(schemaForPatchOrganization);
  return {isValid: validate(o), validate: validate};
}

export interface PatchOrganization {
  name?: string;
  description?: Description;
}
