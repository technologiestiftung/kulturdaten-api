/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/GetUsersResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {User, schemaForUser} from "./User.generated";

export const schemaForGetUsersResponse = {
  $id: "GetUsersResponse.yml",
  type: "object",
  properties: {
    success: {type: "boolean"},
    message: {type: "string"},
    data: {type: "object", properties: {users: {type: "array", items: {$ref: "User.yml"}}}}
  },
  required: ["success"]
};

export function validateGetUsersResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForUser, "User.yml");

  const validate = ajv.compile(schemaForGetUsersResponse);
  return {isValid: validate(o), validate: validate};
}

export interface GetUsersResponse {
  success: boolean;
  message?: string;
  data?: {
    users?: User[];
  };
}
