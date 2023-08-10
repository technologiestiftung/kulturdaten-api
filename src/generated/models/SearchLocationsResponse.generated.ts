/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/SearchLocationsResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {GetTagsResponse, schemaForGetTagsResponse} from "./GetTagsResponse.generated";
import {Tag, schemaForTag} from "./Tag.generated";
import {Metadata, schemaForMetadata} from "./Metadata.generated";

export const schemaForSearchLocationsResponse = {$id: "SearchLocationsResponse.yml", $ref: "GetTagsResponse.yml"};

export function validateSearchLocationsResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForGetTagsResponse, "GetTagsResponse.yml");
  ajv.addSchema(schemaForTag, "Tag.yml");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");

  const validate = ajv.compile(schemaForSearchLocationsResponse);
  return {isValid: validate(o), validate: validate};
}

export interface SearchLocationsResponse {
  success: boolean;
  message?: string;
  data?: {
    tags?: Tag[];
  };
}
