/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/SearchAttractionsResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {GetAttractionsResponse, schemaForGetAttractionsResponse} from "./GetAttractionsResponse.generated";
import {Attraction, schemaForAttraction} from "./Attraction.generated";
import {Metadata, schemaForMetadata} from "./Metadata.generated";
import {ExternalLinks, schemaForExternalLinks} from "./ExternalLinks.generated";

export const schemaForSearchAttractionsResponse = {
  $id: "SearchAttractionsResponse.yml",
  $ref: "GetAttractionsResponse.yml"
};

export function validateSearchAttractionsResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForGetAttractionsResponse, "GetAttractionsResponse.yml");
  ajv.addSchema(schemaForAttraction, "Attraction.yml");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");
  ajv.addSchema(schemaForExternalLinks, "ExternalLinks.yml");

  const validate = ajv.compile(schemaForSearchAttractionsResponse);
  return {isValid: validate(o), validate: validate};
}

export interface SearchAttractionsResponse {
  success: boolean;
  message?: string;
  data?: {
    attractions?: Attraction[];
  };
}