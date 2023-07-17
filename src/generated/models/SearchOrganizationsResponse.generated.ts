/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/SearchOrganizationsResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {GetOrganizationsResponse, schemaForGetOrganizationsResponse} from "./GetOrganizationsResponse.generated";
import {Organization, schemaForOrganization} from "./Organization.generated";
import {Metadata, schemaForMetadata} from "./Metadata.generated";
import {Address, schemaForAddress} from "./Address.generated";
import {Borough, schemaForBorough} from "./Borough.generated";
import {Coordinates, schemaForCoordinates} from "./Coordinates.generated";
import {Contact, schemaForContact} from "./Contact.generated";

export const schemaForSearchOrganizationsResponse = {
  $id: "SearchOrganizationsResponse.yml",
  $ref: "GetOrganizationsResponse.yml"
};

export function validateSearchOrganizationsResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForGetOrganizationsResponse, "GetOrganizationsResponse.yml");
  ajv.addSchema(schemaForOrganization, "Organization.yml");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");
  ajv.addSchema(schemaForAddress, "Address.yml");
  ajv.addSchema(schemaForBorough, "Borough.yml");
  ajv.addSchema(schemaForCoordinates, "Coordinates.yml");
  ajv.addSchema(schemaForContact, "Contact.yml");

  const validate = ajv.compile(schemaForSearchOrganizationsResponse);
  return {isValid: validate(o), validate: validate};
}

export interface SearchOrganizationsResponse {
  success: boolean;
  message?: string;
  data?: {
    organizations?: Organization[];
  };
}