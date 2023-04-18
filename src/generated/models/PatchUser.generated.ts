/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/PatchUser.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForPatchUser = {
  $id: "PatchUser.yml",
  type: "object",
  additionalProperties: false,
  properties: {
    email: {type: "string", minLength: 1},
    firstName: {type: "string", minLength: 1},
    lastName: {type: "string", minLength: 1},
    permissionFlags: {type: "number"}
  }
};

export function validatePatchUser(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);

  const validate = ajv.compile(schemaForPatchUser);
  return {isValid: validate(o), validate: validate};
}

export interface PatchUser {
  email?: string;
  firstName?: string;
  lastName?: string;
  permissionFlags?: number;
}
