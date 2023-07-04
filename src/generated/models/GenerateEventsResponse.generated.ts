/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/GenerateEventsResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForGenerateEventsResponse = {
  $id: "GenerateEventsResponse.yml",
  properties: {
    success: {type: "boolean", enum: [true]},
    message: {type: "string"},
    data: {
      type: "object",
      properties: {attractionIdentifier: {type: "string"}, eventsIdentifier: {type: "array", items: {type: "string"}}}
    }
  },
  required: ["success"]
};

export function validateGenerateEventsResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForGenerateEventsResponse);
  return {isValid: validate(o), validate: validate};
}

export interface GenerateEventsResponse {
  success: true;
  message?: string;
  data?: {
    attractionIdentifier?: string;
    eventsIdentifier?: string[];
  };
}
