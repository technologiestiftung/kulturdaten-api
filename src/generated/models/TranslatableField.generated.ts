/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/TranslatableField.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForTranslatableField = {
  $id: "TranslatableField.yml",
  type: "object",
  additionalProperties: {type: "string"},
  description: 'A string that can be translated into multiple languages, e.g. { "de": "Konzert", "en": "concert" }',
  example: {de: "Konzert", en: "concert"}
};

export function validateTranslatableField(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForTranslatableField);
  return {isValid: validate(o), validate: validate};
}

/**
 * A string that can be translated into multiple languages, e.g. { "de": "Konzert", "en": "concert" }
 */
export interface TranslatableField {
  [k: string]: string;
}
