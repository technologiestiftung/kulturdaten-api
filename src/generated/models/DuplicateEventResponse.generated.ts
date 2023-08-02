/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/DuplicateEventResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForDuplicateEventResponse = {
  $id: "DuplicateEventResponse.yml",
  properties: {
    success: {type: "boolean", enum: [true]},
    message: {type: "string"},
    data: {type: "object", properties: {eventIdentifier: {type: "string"}}}
  },
  required: ["success"]
};

export function validateDuplicateEventResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForDuplicateEventResponse);
  return {isValid: validate(o), validate: validate};
}

export interface DuplicateEventResponse {
  success: true;
  message?: string;
  data?: {
    eventIdentifier?: string;
  };
}
