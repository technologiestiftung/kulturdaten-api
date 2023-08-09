/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/CreateLocationRequest.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Address, schemaForAddress} from "./Address.generated";
import {Borough, schemaForBorough} from "./Borough.generated";
import {Coordinates, schemaForCoordinates} from "./Coordinates.generated";
import {OpeningHours, schemaForOpeningHours} from "./OpeningHours.generated";
import {ExternalLinks, schemaForExternalLinks} from "./ExternalLinks.generated";
import {Reference, schemaForReference} from "./Reference.generated";
import {Contact, schemaForContact} from "./Contact.generated";

export const schemaForCreateLocationRequest = {
  $id: "CreateLocationRequest.yml",
  type: "object",
  properties: {
    title: {type: "object", additionalProperties: {type: "string"}},
    displayName: {type: "object", additionalProperties: {type: "string"}},
    description: {type: "object", additionalProperties: {type: "string"}},
    website: {type: "string"},
    address: {$ref: "Address.yml"},
    borough: {$ref: "Borough.yml"},
    coordinates: {$ref: "Coordinates.yml"},
    openingHours: {$ref: "OpeningHours.yml"},
    inLanguages: {type: "array", items: {type: "string"}},
    accessibility: {type: "array", items: {type: "string"}},
    tags: {type: "array", items: {type: "string"}},
    externalLinks: {type: "array", items: {$ref: "ExternalLinks.yml"}},
    manager: {$ref: "Reference.yml"},
    contact: {$ref: "Contact.yml"},
    metadata: {type: "object", properties: {origin: {type: "string"}, originObjectID: {type: "string"}}}
  }
};

export function validateCreateLocationRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForAddress, "Address.yml");
  ajv.addSchema(schemaForBorough, "Borough.yml");
  ajv.addSchema(schemaForCoordinates, "Coordinates.yml");
  ajv.addSchema(schemaForOpeningHours, "OpeningHours.yml");
  ajv.addSchema(schemaForExternalLinks, "ExternalLinks.yml");
  ajv.addSchema(schemaForReference, "Reference.yml");
  ajv.addSchema(schemaForContact, "Contact.yml");

  const validate = ajv.compile(schemaForCreateLocationRequest);
  return {isValid: validate(o), validate: validate};
}

export interface CreateLocationRequest {
  title?: {
    [k: string]: string;
  };
  displayName?: {
    [k: string]: string;
  };
  description?: {
    [k: string]: string;
  };
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
  openingHours?: OpeningHours;
  inLanguages?: string[];
  accessibility?: string[];
  tags?: string[];
  externalLinks?: ExternalLinks[];
  manager?: Reference;
  contact?: Contact;
  metadata?: {
    origin?: string;
    originObjectID?: string;
  };
}
