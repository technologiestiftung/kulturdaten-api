/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/SearchTagsRequest.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForSearchTagsRequest = {
  $id: "SearchTagsRequest.yml",
  type: "object",
  properties: {searchFilter: {type: "object", additionalProperties: true}}
};

export function validateSearchTagsRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForSearchTagsRequest);
  return {isValid: validate(o), validate: validate};
}

export interface SearchTagsRequest {
  searchFilter?: {
    [k: string]: unknown;
  };
}
