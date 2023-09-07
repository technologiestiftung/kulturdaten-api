/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Location.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Metadata, schemaForMetadata} from "./Metadata.generated";
import {Address, schemaForAddress} from "./Address.generated";
import {Borough, schemaForBorough} from "./Borough.generated";
import {Coordinates, schemaForCoordinates} from "./Coordinates.generated";
import {OpeningHours, schemaForOpeningHours} from "./OpeningHours.generated";
import {ExternalLinks, schemaForExternalLinks} from "./ExternalLinks.generated";
import {Reference, schemaForReference} from "./Reference.generated";
import {Contact, schemaForContact} from "./Contact.generated";

export const schemaForLocation = {
  $id: "Location.yml",
  type: "object",
  required: ["identifier"],
  properties: {
    type: {type: "string", enum: ["type.Location"]},
    identifier: {type: "string"},
    metadata: {$ref: "Metadata.yml"},
    status: {type: "string", enum: ["location.published", "location.unpublished", "location.archived"]},
    title: {type: "object", additionalProperties: {type: "string"}},
    displayName: {type: "object", additionalProperties: {type: "string"}},
    description: {type: "object", additionalProperties: {type: "string"}},
    website: {type: "string"},
    address: {$ref: "Address.yml"},
    borough: {$ref: "Borough.yml"},
    coordinates: {$ref: "Coordinates.yml"},
    openingStatus: {type: "string", enum: ["location.opened", "location.closed", "location.permanentlyClosed"]},
    openingHours: {$ref: "OpeningHours.yml"},
    inLanguages: {type: "array", items: {type: "string"}},
    tags: {type: "array", items: {type: "string"}},
    accessibility: {type: "array", items: {type: "string"}},
    externalLinks: {type: "array", items: {$ref: "ExternalLinks.yml"}},
    manager: {$ref: "Reference.yml"},
    contact: {$ref: "Contact.yml"}
  }
};

export function validateLocation(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");
  ajv.addSchema(schemaForAddress, "Address.yml");
  ajv.addSchema(schemaForBorough, "Borough.yml");
  ajv.addSchema(schemaForCoordinates, "Coordinates.yml");
  ajv.addSchema(schemaForOpeningHours, "OpeningHours.yml");
  ajv.addSchema(schemaForExternalLinks, "ExternalLinks.yml");
  ajv.addSchema(schemaForReference, "Reference.yml");
  ajv.addSchema(schemaForContact, "Contact.yml");

  const validate = ajv.compile(schemaForLocation);
  return {isValid: validate(o), validate: validate};
}

export interface Location {
  type?: "type.Location";
  identifier: string;
  metadata?: Metadata;
  status?: "location.published" | "location.unpublished" | "location.archived";
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
  openingStatus?: "location.opened" | "location.closed" | "location.permanentlyClosed";
  openingHours?: OpeningHours;
  inLanguages?: string[];
  tags?: string[];
  accessibility?: string[];
  externalLinks?: ExternalLinks[];
  manager?: Reference;
  contact?: Contact;
}
