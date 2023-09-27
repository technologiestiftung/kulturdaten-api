/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Organization.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Metadata, schemaForMetadata} from "./Metadata.generated";
import {TranslatableField, schemaForTranslatableField} from "./TranslatableField.generated";
import {Address, schemaForAddress} from "./Address.generated";
import {Borough, schemaForBorough} from "./Borough.generated";
import {Coordinates, schemaForCoordinates} from "./Coordinates.generated";
import {Contact, schemaForContact} from "./Contact.generated";

export const schemaForOrganization = {
  $id: "Organization.yml",
  type: "object",
  required: ["identifier"],
  properties: {
    type: {type: "string", enum: ["type.Organization"]},
    identifier: {type: "string"},
    metadata: {$ref: "Metadata.yml"},
    status: {type: "string", enum: ["organization.published", "organization.unpublished", "organization.archived"]},
    activationStatus: {type: "string", enum: ["organization.active", "organization.inactive", "organization.retired"]},
    title: {$ref: "TranslatableField.yml"},
    displayName: {$ref: "TranslatableField.yml"},
    description: {$ref: "TranslatableField.yml"},
    website: {type: "string"},
    inLanguages: {type: "array", items: {type: "string"}},
    tags: {type: "array", items: {type: "string"}},
    address: {$ref: "Address.yml"},
    borough: {$ref: "Borough.yml"},
    coordinates: {$ref: "Coordinates.yml"},
    contact: {$ref: "Contact.yml"}
  }
};

export function validateOrganization(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");
  ajv.addSchema(schemaForTranslatableField, "TranslatableField.yml");
  ajv.addSchema(schemaForAddress, "Address.yml");
  ajv.addSchema(schemaForBorough, "Borough.yml");
  ajv.addSchema(schemaForCoordinates, "Coordinates.yml");
  ajv.addSchema(schemaForContact, "Contact.yml");

  const validate = ajv.compile(schemaForOrganization);
  return {isValid: validate(o), validate: validate};
}

export interface Organization {
  type?: "type.Organization";
  identifier: string;
  metadata?: Metadata;
  status?: "organization.published" | "organization.unpublished" | "organization.archived";
  activationStatus?: "organization.active" | "organization.inactive" | "organization.retired";
  title?: TranslatableField;
  displayName?: TranslatableField;
  description?: TranslatableField;
  website?: string;
  inLanguages?: string[];
  tags?: string[];
  address?: Address;
  borough?:
    | "Mitte"
    | "Friedrichshain-Kreuzberg"
    | "Pankow"
    | "Charlottenburg-Wilmersdorf"
    | "Spandau"
    | "Steglitz-Zehlendorf"
    | "Tempelhof-Schöneberg"
    | "Neukölln"
    | "Treptow-Köpenick"
    | "Marzahn-Hellersdorf"
    | "Lichtenberg"
    | "Reinickendorf"
    | "außerhalb";
  coordinates?: Coordinates;
  contact?: Contact;
}
