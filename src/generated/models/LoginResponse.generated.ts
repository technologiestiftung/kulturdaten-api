/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/LoginResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {User, schemaForUser} from "./User.generated";

export const schemaForLoginResponse = {
  $id: "LoginResponse.yml",
  type: "object",
  properties: {
    success: {type: "boolean"},
    message: {type: "string"},
    data: {
      type: "object",
      required: ["accessToken", "expiresIn", "user"],
      properties: {accessToken: {type: "string"}, expiresIn: {type: "string"}, user: {$ref: "User.yml"}}
    }
  },
  required: ["success"]
};

export function validateLoginResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForUser, "User.yml");

  const validate = ajv.compile(schemaForLoginResponse);
  return {isValid: validate(o), validate: validate};
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: {
    accessToken: string;
    expiresIn: string;
    user: User;
  };
}
