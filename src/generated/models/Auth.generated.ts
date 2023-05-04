/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Auth.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Reference, schemaForReference} from "./Reference.generated";

export const schemaForAuth = {
  $id: "Auth.yml",
  type: "object",
  properties: {accessToken: {type: "string"}, expiresIn: {type: "string"}, user: {$ref: "Reference.yml"}}
};

export function validateAuth(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForReference, "Reference.yml");

  const validate = ajv.compile(schemaForAuth);
  return {isValid: validate(o), validate: validate};
}

export interface Auth {
  accessToken?: string;
  expiresIn?: string;
  user?: Reference;
}
