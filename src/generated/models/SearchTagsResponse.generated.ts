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

import {GetLocationsResponse, schemaForGetLocationsResponse} from "./GetLocationsResponse.generated";
import {Location, schemaForLocation} from "./Location.generated";
import {Metadata, schemaForMetadata} from "./Metadata.generated";
import {Address, schemaForAddress} from "./Address.generated";
import {Borough, schemaForBorough} from "./Borough.generated";
import {Coordinates, schemaForCoordinates} from "./Coordinates.generated";
import {OpeningHours, schemaForOpeningHours} from "./OpeningHours.generated";
import {ExternalLinks, schemaForExternalLinks} from "./ExternalLinks.generated";
import {Reference, schemaForReference} from "./Reference.generated";
import {Contact, schemaForContact} from "./Contact.generated";

export const schemaForSearchTagsResponse = {$id: "SearchTagsResponse.yml", $ref: "GetLocationsResponse.yml"};

export function validateSearchTagsResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForGetLocationsResponse, "GetLocationsResponse.yml");
  ajv.addSchema(schemaForLocation, "Location.yml");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");
  ajv.addSchema(schemaForAddress, "Address.yml");
  ajv.addSchema(schemaForBorough, "Borough.yml");
  ajv.addSchema(schemaForCoordinates, "Coordinates.yml");
  ajv.addSchema(schemaForOpeningHours, "OpeningHours.yml");
  ajv.addSchema(schemaForExternalLinks, "ExternalLinks.yml");
  ajv.addSchema(schemaForReference, "Reference.yml");
  ajv.addSchema(schemaForContact, "Contact.yml");

  const validate = ajv.compile(schemaForSearchTagsResponse);
  return {isValid: validate(o), validate: validate};
}

export interface SearchTagsResponse {
  success: boolean;
  message?: string;
  data?: {
    locations?: Location[];
    locationsReferences?: Reference[];
  };
}
