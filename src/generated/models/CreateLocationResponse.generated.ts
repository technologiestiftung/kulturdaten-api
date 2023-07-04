/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/CreateLocationResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForCreateLocationResponse = {
  $id: "CreateLocationResponse.yml",
  type: "object",
  properties: {
    success: {type: "boolean", enum: [true]},
    message: {type: "string"},
    data: {type: "object", properties: {locationIdentifier: {type: "string"}}}
  },
  required: ["success"]
};

export function validateCreateLocationResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForCreateLocationResponse);
  return {isValid: validate(o), validate: validate};
}

export interface CreateLocationResponse {
  success: true;
  message?: string;
  data?: {
    locationIdentifier?: string;
  };
}
