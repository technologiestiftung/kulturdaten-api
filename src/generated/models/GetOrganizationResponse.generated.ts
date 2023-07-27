/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/GetOrganizationResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Organization, schemaForOrganization} from "./Organization.generated";
import {Metadata, schemaForMetadata} from "./Metadata.generated";
import {Address, schemaForAddress} from "./Address.generated";
import {Borough, schemaForBorough} from "./Borough.generated";
import {Coordinates, schemaForCoordinates} from "./Coordinates.generated";
import {Contact, schemaForContact} from "./Contact.generated";
import {Reference, schemaForReference} from "./Reference.generated";

export const schemaForGetOrganizationResponse = {
  $id: "GetOrganizationResponse.yml",
  type: "object",
  properties: {
    success: {type: "boolean"},
    message: {type: "string"},
    data: {
      type: "object",
      properties: {organization: {$ref: "Organization.yml"}, organizationReference: {$ref: "Reference.yml"}}
    }
  },
  required: ["success"]
};

export function validateGetOrganizationResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForOrganization, "Organization.yml");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");
  ajv.addSchema(schemaForAddress, "Address.yml");
  ajv.addSchema(schemaForBorough, "Borough.yml");
  ajv.addSchema(schemaForCoordinates, "Coordinates.yml");
  ajv.addSchema(schemaForContact, "Contact.yml");
  ajv.addSchema(schemaForReference, "Reference.yml");

  const validate = ajv.compile(schemaForGetOrganizationResponse);
  return {isValid: validate(o), validate: validate};
}

export interface GetOrganizationResponse {
  success: boolean;
  message?: string;
  data?: {
    organization?: Organization;
    organizationReference?: Reference;
  };
}
