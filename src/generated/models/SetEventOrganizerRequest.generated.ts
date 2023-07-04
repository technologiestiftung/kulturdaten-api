/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/SetEventOrganizerRequest.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForSetEventOrganizerRequest = {
  $id: "SetEventOrganizerRequest.yml",
  type: "object",
  properties: {
    organizationIdentifier: {type: "string"},
    alternativeDisplayName: {type: "object", additionalProperties: {type: "string"}}
  }
};

export function validateSetEventOrganizerRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForSetEventOrganizerRequest);
  return {isValid: validate(o), validate: validate};
}

export interface SetEventOrganizerRequest {
  organizationIdentifier?: string;
  alternativeDisplayName?: {
    [k: string]: string;
  };
}
