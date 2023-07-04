/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/RemoveEventLocationRequest.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForRemoveEventLocationRequest = {
  $id: "RemoveEventLocationRequest.yml",
  type: "object",
  properties: {locationIdentifier: {type: "string"}},
  required: ["locationIdentifier"]
};

export function validateRemoveEventLocationRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForRemoveEventLocationRequest);
  return {isValid: validate(o), validate: validate};
}

export interface RemoveEventLocationRequest {
  locationIdentifier: string;
}
