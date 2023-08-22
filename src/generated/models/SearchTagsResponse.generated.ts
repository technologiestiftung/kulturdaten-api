/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/SearchTagsResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {GetTagsResponse, schemaForGetTagsResponse} from "./GetTagsResponse.generated";
import {Tag, schemaForTag} from "./Tag.generated";
import {Metadata, schemaForMetadata} from "./Metadata.generated";

export const schemaForSearchTagsResponse = {$id: "SearchTagsResponse.yml", $ref: "GetTagsResponse.yml"};

export function validateSearchTagsResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForGetTagsResponse, "GetTagsResponse.yml");
  ajv.addSchema(schemaForTag, "Tag.yml");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");

  const validate = ajv.compile(schemaForSearchTagsResponse);
  return {isValid: validate(o), validate: validate};
}

export interface SearchTagsResponse {
  success: boolean;
  message?: string;
  data?: {
    tags?: Tag[];
  };
}
