/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Response.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Error, schemaForError} from "./Error.generated";

export const schemaForResponse = {
  $id: "Response.yml",
  type: "object",
  properties: {
    success: {type: "boolean"},
    message: {type: "string"},
    data: {type: "object"},
    error: {$ref: "Error.yml"}
  },
  required: ["success"]
};

export function validateResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForError, "Error.yml");

  const validate = ajv.compile(schemaForResponse);
  return {isValid: validate(o), validate: validate};
}

export interface Response {
  success: boolean;
  message?: string;
  data?: {};
  error?: Error;
}
