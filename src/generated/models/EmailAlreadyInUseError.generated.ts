/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/EmailAlreadyInUseError.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForEmailAlreadyInUseError = {
  $id: "EmailAlreadyInUseError.yml",
  type: "object",
  properties: {
    success: {type: "boolean"},
    message: {type: "string"},
    data: {type: "object"},
    error: {
      type: "object",
      properties: {code: {type: "number"}, message: {type: "string"}, details: {type: "string"}},
      required: ["code"]
    }
  },
  required: ["success", "error"]
};

export function validateEmailAlreadyInUseError(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForEmailAlreadyInUseError);
  return {isValid: validate(o), validate: validate};
}

export interface EmailAlreadyInUseError {
  success: boolean;
  message?: string;
  data?: {};
  error: {
    code: number;
    message?: string;
    details?: string;
  };
}
