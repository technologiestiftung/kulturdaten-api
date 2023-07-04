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

export const schemaForReference = {
  $id: "Reference.yml",
  type: "object",
  properties: {
    referenceType: {type: "string"},
    referenceId: {type: "string"},
    referenceLabel: {type: "object", additionalProperties: {type: "string"}}
  }
};

export function validateReference(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForReference);
  return {isValid: validate(o), validate: validate};
}

export interface Reference {
  referenceType?: string;
  referenceId?: string;
  referenceLabel?: {
    [k: string]: string;
  };
}
