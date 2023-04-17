/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Description.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";

export const schemaForDescription = {
  $id: "Description.yml",
  type: "object",
  properties: {de: {type: "string"}, en: {type: "string"}, "de-easy": {type: "string"}},
  additionalProperties: true
};

export function validateDescription(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();

  const validate = ajv.compile(schemaForDescription);
  return {isValid: validate(o), validate: validate};
}

export interface Description {
  de?: string;
  en?: string;
  "de-easy"?: string;
  [k: string]: unknown;
}
