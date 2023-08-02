/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/UpdateUserPasswordRequest.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForUpdateUserPasswordRequest = {
  $id: "UpdateUserPasswordRequest.yml",
  type: "object",
  properties: {oneTimeCode: {type: "string"}, newPassword: {type: "string"}}
};

export function validateUpdateUserPasswordRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForUpdateUserPasswordRequest);
  return {isValid: validate(o), validate: validate};
}

export interface UpdateUserPasswordRequest {
  oneTimeCode?: string;
  newPassword?: string;
}
