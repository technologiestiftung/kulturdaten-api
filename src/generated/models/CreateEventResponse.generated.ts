/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/CreateEventResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Reference, schemaForReference} from "./Reference.generated";

export const schemaForCreateEventResponse = {
  $id: "CreateEventResponse.yml",
  type: "object",
  properties: {
    success: {type: "boolean", enum: [true]},
    message: {type: "string"},
    data: {type: "object", properties: {eventReference: {$ref: "Reference.yml"}}}
  },
  required: ["success"]
};

export function validateCreateEventResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForReference, "Reference.yml");

  const validate = ajv.compile(schemaForCreateEventResponse);
  return {isValid: validate(o), validate: validate};
}

export interface CreateEventResponse {
  success: true;
  message?: string;
  data?: {
    eventReference?: Reference;
  };
}
