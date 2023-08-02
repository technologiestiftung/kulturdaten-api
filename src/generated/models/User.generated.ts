/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/User.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForUser = {
  $id: "User.yml",
  type: "object",
  properties: {
    type: {type: "string", enum: ["User"]},
    identifier: {type: "string"},
    email: {type: "string"},
    password: {type: "string"},
    firstName: {type: "string"},
    lastName: {type: "string"},
    createdAt: {type: "string"},
    updatedAt: {type: "string"},
    permissionFlags: {type: "number"}
  },
  required: ["identifier", "email", "permissionFlags"]
};

export function validateUser(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForUser);
  return {isValid: validate(o), validate: validate};
}

export interface User {
  type?: "User";
  identifier: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
  updatedAt?: string;
  permissionFlags: number;
}
