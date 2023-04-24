/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/CreateUser.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForCreateUser = {
  $id: "CreateUser.yml",
  type: "object",
  additionalProperties: false,
  properties: {
    email: {type: "string", format: "email", minLength: 1},
    password: {type: "string", format: "password", minLength: 12},
    firstName: {type: "string"},
    lastName: {type: "string"}
  },
  required: ["email", "password"]
};

export function validateCreateUser(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForCreateUser);
  return {isValid: validate(o), validate: validate};
}

export interface CreateUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
