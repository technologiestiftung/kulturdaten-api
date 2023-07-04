/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/AddEventAttractionRequest.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForAddEventAttractionRequest = {
  $id: "AddEventAttractionRequest.yml",
  type: "object",
  properties: {
    attractionIdentifier: {type: "string"},
    alternativeDisplayName: {type: "object", additionalProperties: {type: "string"}}
  }
};

export function validateAddEventAttractionRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForAddEventAttractionRequest);
  return {isValid: validate(o), validate: validate};
}

export interface AddEventAttractionRequest {
  attractionIdentifier?: string;
  alternativeDisplayName?: {
    [k: string]: string;
  };
}
