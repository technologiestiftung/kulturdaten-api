/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/RemoveExternalLinkRequest.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForRemoveExternalLinkRequest = {
  $id: "RemoveExternalLinkRequest.yml",
  type: "object",
  properties: {url: {type: "string"}},
  required: ["url"]
};

export function validateRemoveExternalLinkRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForRemoveExternalLinkRequest);
  return {isValid: validate(o), validate: validate};
}

export interface RemoveExternalLinkRequest {
  url: string;
}
