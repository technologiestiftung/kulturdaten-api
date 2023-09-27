/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Reference.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {TranslatableField, schemaForTranslatableField} from "./TranslatableField.generated";

export const schemaForReference = {
  $id: "Reference.yml",
  type: "object",
  properties: {
    referenceType: {type: "string"},
    referenceId: {type: "string"},
    referenceLabel: {$ref: "TranslatableField.yml"}
  }
};

export function validateReference(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForTranslatableField, "TranslatableField.yml");

  const validate = ajv.compile(schemaForReference);
  return {isValid: validate(o), validate: validate};
}

export interface Reference {
  referenceType?: string;
  referenceId?: string;
  referenceLabel?: TranslatableField;
}
