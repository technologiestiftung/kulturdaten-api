/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/GetAttractionResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Attraction, schemaForAttraction} from "./Attraction.generated";
import {Metadata, schemaForMetadata} from "./Metadata.generated";
import {ExternalLinks, schemaForExternalLinks} from "./ExternalLinks.generated";
import {Reference, schemaForReference} from "./Reference.generated";

export const schemaForGetAttractionResponse = {
  $id: "GetAttractionResponse.yml",
  type: "object",
  properties: {
    success: {type: "boolean"},
    message: {type: "string"},
    data: {
      type: "object",
      properties: {attraction: {$ref: "Attraction.yml"}, attractionReference: {$ref: "Reference.yml"}}
    }
  },
  required: ["success"]
};

export function validateGetAttractionResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForAttraction, "Attraction.yml");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");
  ajv.addSchema(schemaForExternalLinks, "ExternalLinks.yml");
  ajv.addSchema(schemaForReference, "Reference.yml");

  const validate = ajv.compile(schemaForGetAttractionResponse);
  return {isValid: validate(o), validate: validate};
}

export interface GetAttractionResponse {
  success: boolean;
  message?: string;
  data?: {
    attraction?: Attraction;
    attractionReference?: Reference;
  };
}
