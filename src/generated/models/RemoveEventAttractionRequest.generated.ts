/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/RemoveEventAttractionRequest.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForRemoveEventAttractionRequest = {
  $id: "RemoveEventAttractionRequest.yml",
  type: "object",
  properties: {attractionIdentifier: {type: "string"}},
  required: ["attractionIdentifier"]
};

export function validateRemoveEventAttractionRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForRemoveEventAttractionRequest);
  return {isValid: validate(o), validate: validate};
}

export interface RemoveEventAttractionRequest {
  attractionIdentifier: string;
}
