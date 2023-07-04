/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/ExternalLinks.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForExternalLinks = {
  $id: "ExternalLinks.yml",
  type: "array",
  items: {type: "object", properties: {displayName: {type: "string"}, url: {type: "string"}}, required: ["url"]}
};

export function validateExternalLinks(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForExternalLinks);
  return {isValid: validate(o), validate: validate};
}

export type ExternalLinks = {
  displayName?: string;
  url: string;
}[];
