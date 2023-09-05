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

import {MatchMode, schemaForMatchMode} from "./MatchMode.generated";

export const schemaForSearchEventsRequest = {
  $id: "SearchEventsRequest.yml",
  type: "object",
  properties: {
    matchMode: {$ref: "MatchMode.yml"},
    searchFilter: {type: "object", additionalProperties: true},
    byAttractionTags: {
      type: "object",
      properties: {tags: {type: "array", items: {type: "string"}}, matchMode: {$ref: "MatchMode.yml"}}
    }
  }
};

export function validateSearchEventsRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForMatchMode, "MatchMode.yml");

  const validate = ajv.compile(schemaForSearchEventsRequest);
  return {isValid: validate(o), validate: validate};
}

export interface SearchEventsRequest {
  matchMode?: "any" | "all";
  searchFilter?: {
    [k: string]: unknown;
  };
  byAttractionTags?: {
    tags?: string[];
    matchMode?: "any" | "all";
  };
}
