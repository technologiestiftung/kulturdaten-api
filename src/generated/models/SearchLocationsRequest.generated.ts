/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/SearchLocationsRequest.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForSearchLocationsRequest = {
  $id: "SearchLocationsRequest.yml",
  type: "object",
  properties: {
    searchTerm: {
      type: "object",
      properties: {value: {type: "string"}, matchType: {type: "string", enum: ["exact", "contains", "similar"]}}
    }
  }
};

export function validateSearchLocationsRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForSearchLocationsRequest);
  return {isValid: validate(o), validate: validate};
}

export interface SearchLocationsRequest {
  searchTerm?: {
    value?: string;
    matchType?: "exact" | "contains" | "similar";
  };
}
