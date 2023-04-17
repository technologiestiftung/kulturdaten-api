/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/User.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";

export const schemaForUser = {
  $id: "User.yml",
  type: "object",
  properties: {
    identifier: {type: "string"},
    email: {type: "string"},
    password: {type: "string"},
    firstName: {type: "string"},
    lastName: {type: "string"},
    createdAt: {type: "string", format: "date-time"},
    updatedAt: {type: "string", format: "date-time"},
    permissionFlags: {type: "number"}
  },
  required: ["identifier", "email", "permissionFlags"]
};

export function validateUser(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForUser);
  return {isValid: validate(o), validate: validate};
}

export interface User {
  identifier: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
  updatedAt?: string;
  permissionFlags: number;
}
