/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Error.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForError = {
  $id: "Error.yml",
  type: "object",
  properties: {code: {type: "number"}, message: {type: "string"}, details: {type: "string"}}
};

export function validateError(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForError);
  return {isValid: validate(o), validate: validate};
}

export interface Error {
  code?: number;
  message?: string;
  details?: string;
}