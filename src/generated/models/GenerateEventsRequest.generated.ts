/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/GenerateEventsRequest.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForGenerateEventsRequest = {
  $id: "GenerateEventsRequest.yml",
  type: "object",
  properties: {textInput: {type: "string"}}
};

export function validateGenerateEventsRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForGenerateEventsRequest);
  return {isValid: validate(o), validate: validate};
}

export interface GenerateEventsRequest {
  textInput?: string;
}
