/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/GetLocationsResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Location, schemaForLocation} from "./Location.generated";
import {Metadata, schemaForMetadata} from "./Metadata.generated";
import {TranslatableField, schemaForTranslatableField} from "./TranslatableField.generated";
import {Address, schemaForAddress} from "./Address.generated";
import {Borough, schemaForBorough} from "./Borough.generated";
import {Coordinates, schemaForCoordinates} from "./Coordinates.generated";
import {OpeningHours, schemaForOpeningHours} from "./OpeningHours.generated";
import {ExternalLinks, schemaForExternalLinks} from "./ExternalLinks.generated";
import {Reference, schemaForReference} from "./Reference.generated";
import {Contact, schemaForContact} from "./Contact.generated";

export const schemaForGetLocationsResponse = {
  $id: "GetLocationsResponse.yml",
  type: "object",
  properties: {
    success: {type: "boolean"},
    message: {type: "string"},
    data: {
      type: "object",
      properties: {
        page: {type: "number"},
        pageSize: {type: "number"},
        totalCount: {type: "number"},
        locations: {type: "array", items: {$ref: "Location.yml"}},
        locationsReferences: {type: "array", items: {$ref: "Reference.yml"}}
      }
    }
  },
  required: ["success"]
};

export function validateGetLocationsResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForLocation, "Location.yml");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");
  ajv.addSchema(schemaForTranslatableField, "TranslatableField.yml");
  ajv.addSchema(schemaForAddress, "Address.yml");
  ajv.addSchema(schemaForBorough, "Borough.yml");
  ajv.addSchema(schemaForCoordinates, "Coordinates.yml");
  ajv.addSchema(schemaForOpeningHours, "OpeningHours.yml");
  ajv.addSchema(schemaForExternalLinks, "ExternalLinks.yml");
  ajv.addSchema(schemaForReference, "Reference.yml");
  ajv.addSchema(schemaForContact, "Contact.yml");

  const validate = ajv.compile(schemaForGetLocationsResponse);
  return {isValid: validate(o), validate: validate};
}

export interface GetLocationsResponse {
  success: boolean;
  message?: string;
  data?: {
    page?: number;
    pageSize?: number;
    totalCount?: number;
    locations?: Location[];
    locationsReferences?: Reference[];
  };
}
