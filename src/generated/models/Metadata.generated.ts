/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Metadata.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForMetadata = {
  $id: "Metadata.yml",
  type: "object",
  properties: {
    created: {type: "string", format: "date-time"},
    updated: {type: "string", format: "data-time"},
    origin: {type: "string"},
    originObjectID: {type: "string"},
    availableLanguages: {type: "array", items: {type: "string"}}
  }
};

export function validateMetadata(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForMetadata);
  return {isValid: validate(o), validate: validate};
}

export interface Metadata {
  created?: string;
  updated?: string;
  origin?: string;
  originObjectID?: string;
  availableLanguages?: string[];
}
