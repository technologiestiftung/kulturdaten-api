/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/LoginRequest.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForLoginRequest = {
  $id: "LoginRequest.yml",
  type: "object",
  properties: {password: {type: "string"}, email: {type: "string"}}
};

export function validateLoginRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForLoginRequest);
  return {isValid: validate(o), validate: validate};
}

export interface LoginRequest {
  password?: string;
  email?: string;
}
