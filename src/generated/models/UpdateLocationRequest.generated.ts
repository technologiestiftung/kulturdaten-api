/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/UpdateLocationRequest.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {TranslatableField, schemaForTranslatableField} from "./TranslatableField.generated";
import {Address, schemaForAddress} from "./Address.generated";
import {Borough, schemaForBorough} from "./Borough.generated";
import {Coordinates, schemaForCoordinates} from "./Coordinates.generated";
import {ExternalLinks, schemaForExternalLinks} from "./ExternalLinks.generated";
import {Contact, schemaForContact} from "./Contact.generated";

export const schemaForUpdateLocationRequest = {
  $id: "UpdateLocationRequest.yml",
  type: "object",
  properties: {
    title: {$ref: "TranslatableField.yml"},
    displayName: {$ref: "TranslatableField.yml"},
    description: {$ref: "TranslatableField.yml"},
    website: {type: "string"},
    address: {$ref: "Address.yml"},
    borough: {$ref: "Borough.yml"},
    coordinates: {$ref: "Coordinates.yml"},
    inLanguages: {type: "array", items: {type: "string"}},
    tags: {type: "array", items: {type: "string"}},
    externalLinks: {type: "array", items: {$ref: "ExternalLinks.yml"}},
    contact: {$ref: "Contact.yml"}
  }
};

export function validateUpdateLocationRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForTranslatableField, "TranslatableField.yml");
  ajv.addSchema(schemaForAddress, "Address.yml");
  ajv.addSchema(schemaForBorough, "Borough.yml");
  ajv.addSchema(schemaForCoordinates, "Coordinates.yml");
  ajv.addSchema(schemaForExternalLinks, "ExternalLinks.yml");
  ajv.addSchema(schemaForContact, "Contact.yml");

  const validate = ajv.compile(schemaForUpdateLocationRequest);
  return {isValid: validate(o), validate: validate};
}

export interface UpdateLocationRequest {
  title?: TranslatableField;
  displayName?: TranslatableField;
  description?: TranslatableField;
  website?: string;
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
  inLanguages?: string[];
  tags?: string[];
  externalLinks?: ExternalLinks[];
  contact?: Contact;
}
