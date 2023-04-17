/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/EmailAlreadyInUseError.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";

export const schemaForEmailAlreadyInUseError = {
  $id: "EmailAlreadyInUseError.yml",
  type: "object",
  properties: {error: {type: "object", properties: {msg: {type: "string"}}}}
};

export function validateEmailAlreadyInUseError(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForEmailAlreadyInUseError);
  return {isValid: validate(o), validate: validate};
}

export interface EmailAlreadyInUseError {
  error?: {
    msg?: string;
  };
}
