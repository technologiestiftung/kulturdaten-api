/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/EventClassification.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForEventClassification = {
  $id: "EventClassification.yml",
  type: "object",
  properties: {family: {type: "boolean"}, tags: {type: "array", items: {type: "string"}}}
};

export function validateEventClassification(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForEventClassification);
  return {isValid: validate(o), validate: validate};
}

export interface EventClassification {
  family?: boolean;
  tags?: string[];
}
