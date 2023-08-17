/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/SearchEventsRequest.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForSearchEventsRequest = {
  $id: "SearchEventsRequest.yml",
  type: "object",
  oneOf: [{required: ["searchFilter"]}, {required: ["findEventsByAttractionTag"]}],
  properties: {
    searchFilter: {type: "object", additionalProperties: true},
    findEventsByAttractionTag: {
      type: "object",
      properties: {tags: {type: "array", items: {type: "string"}}, matchMode: {type: "string", enum: ["any", "all"]}}
    }
  }
};

export function validateSearchEventsRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForSearchEventsRequest);
  return {isValid: validate(o), validate: validate};
}

export type SearchEventsRequest = {
  searchFilter?: {
    [k: string]: unknown;
  };
  findEventsByAttractionTag?: {
    tags?: string[];
    matchMode?: "any" | "all";
  };
} & {
  [k: string]: unknown;
};
