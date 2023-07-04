/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/UpdateAttractionRequest.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {ExternalLinks, schemaForExternalLinks} from "./ExternalLinks.generated";

export const schemaForUpdateAttractionRequest = {
  $id: "UpdateAttractionRequest.yml",
  type: "object",
  properties: {
    title: {type: "object", additionalProperties: {type: "string"}},
    displayName: {type: "object", additionalProperties: {type: "string"}},
    description: {type: "object", additionalProperties: {type: "string"}},
    pleaseNote: {type: "object", additionalProperties: {type: "string"}},
    website: {type: "string"},
    inLanguages: {type: "array", items: {type: "string"}},
    family: {type: "boolean"},
    tags: {type: "array", items: {type: "string"}},
    externalLinks: {$ref: "ExternalLinks.yml"}
  }
};

export function validateUpdateAttractionRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForExternalLinks, "ExternalLinks.yml");

  const validate = ajv.compile(schemaForUpdateAttractionRequest);
  return {isValid: validate(o), validate: validate};
}

export interface UpdateAttractionRequest {
  title?: {
    [k: string]: string;
  };
  displayName?: {
    [k: string]: string;
  };
  description?: {
    [k: string]: string;
  };
  pleaseNote?: {
    [k: string]: string;
  };
  website?: string;
  inLanguages?: string[];
  family?: boolean;
  tags?: string[];
  externalLinks?: ExternalLinks;
}
