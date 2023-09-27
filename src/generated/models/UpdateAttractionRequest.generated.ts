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

import {TranslatableField, schemaForTranslatableField} from "./TranslatableField.generated";
import {ExternalLinks, schemaForExternalLinks} from "./ExternalLinks.generated";

export const schemaForUpdateAttractionRequest = {
  $id: "UpdateAttractionRequest.yml",
  type: "object",
  properties: {
    title: {$ref: "TranslatableField.yml"},
    displayName: {$ref: "TranslatableField.yml"},
    description: {$ref: "TranslatableField.yml"},
    pleaseNote: {$ref: "TranslatableField.yml"},
    website: {type: "string"},
    inLanguages: {type: "array", items: {type: "string"}},
    tags: {type: "array", items: {type: "string"}},
    externalLinks: {$ref: "ExternalLinks.yml"}
  }
};

export function validateUpdateAttractionRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForTranslatableField, "TranslatableField.yml");
  ajv.addSchema(schemaForExternalLinks, "ExternalLinks.yml");

  const validate = ajv.compile(schemaForUpdateAttractionRequest);
  return {isValid: validate(o), validate: validate};
}

export interface UpdateAttractionRequest {
  title?: TranslatableField;
  displayName?: TranslatableField;
  description?: TranslatableField;
  pleaseNote?: TranslatableField;
  website?: string;
  inLanguages?: string[];
  tags?: string[];
  externalLinks?: ExternalLinks;
}
