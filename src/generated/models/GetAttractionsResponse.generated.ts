/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/GetAttractionsResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Pagination, schemaForPagination} from "./Pagination.generated";
import {Attraction, schemaForAttraction} from "./Attraction.generated";
import {Metadata, schemaForMetadata} from "./Metadata.generated";
import {TranslatableField, schemaForTranslatableField} from "./TranslatableField.generated";
import {ExternalLinks, schemaForExternalLinks} from "./ExternalLinks.generated";
import {Reference, schemaForReference} from "./Reference.generated";

export const schemaForGetAttractionsResponse = {
  $id: "GetAttractionsResponse.yml",
  type: "object",
  properties: {
    success: {type: "boolean"},
    message: {type: "string"},
    data: {
      allOf: [
        {$ref: "Pagination.yml"},
        {
          type: "object",
          properties: {
            attractions: {type: "array", items: {$ref: "Attraction.yml"}},
            attractionsReferences: {type: "array", items: {$ref: "Reference.yml"}}
          }
        }
      ]
    }
  },
  required: ["success"]
};

export function validateGetAttractionsResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForPagination, "Pagination.yml");
  ajv.addSchema(schemaForAttraction, "Attraction.yml");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");
  ajv.addSchema(schemaForTranslatableField, "TranslatableField.yml");
  ajv.addSchema(schemaForExternalLinks, "ExternalLinks.yml");
  ajv.addSchema(schemaForReference, "Reference.yml");

  const validate = ajv.compile(schemaForGetAttractionsResponse);
  return {isValid: validate(o), validate: validate};
}

export interface GetAttractionsResponse {
  success: boolean;
  message?: string;
  data?: Pagination & {
    attractions?: Attraction[];
    attractionsReferences?: Reference[];
  };
}
