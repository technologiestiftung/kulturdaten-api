/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/CreateUserRequest.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForCreateUserRequest = {
  $id: "CreateUserRequest.yml",
  type: "object",
  properties: {
    email: {type: "string"},
    password: {type: "string"},
    firstName: {type: "string"},
    lastName: {type: "string"}
  },
  required: ["password", "email"]
};

export function validateCreateUserRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForCreateUserRequest);
  return {isValid: validate(o), validate: validate};
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
