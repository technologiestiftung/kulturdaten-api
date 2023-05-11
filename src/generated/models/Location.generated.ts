/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Location.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Core, schemaForCore} from "./Core.generated";
import {Origin, schemaForOrigin} from "./Origin.generated";
import {Title, schemaForTitle} from "./Title.generated";
import {Text, schemaForText} from "./Text.generated";
import {PostalAddress, schemaForPostalAddress} from "./PostalAddress.generated";
import {GeoCoordinates, schemaForGeoCoordinates} from "./GeoCoordinates.generated";
import {Borough, schemaForBorough} from "./Borough.generated";
import {ContactPoint, schemaForContactPoint} from "./ContactPoint.generated";
import {Reference, schemaForReference} from "./Reference.generated";
import {DefinedTerm, schemaForDefinedTerm} from "./DefinedTerm.generated";
import {ShortText, schemaForShortText} from "./ShortText.generated";

export const schemaForLocation = {
  $id: "Location.yml",
  allOf: [
    {$ref: "Core.yml"},
    {
      type: "object",
      properties: {
        "@type": {type: "string", enum: ["VirtualLocation", "Place"]},
        name: {$ref: "Title.yml"},
        description: {$ref: "Text.yml"},
        address: {$ref: "PostalAddress.yml"},
        geo: {$ref: "GeoCoordinates.yml"},
        borough: {$ref: "Borough.yml"},
        contactPoint: {type: "array", items: {$ref: "ContactPoint.yml"}},
        website: {type: "string"},
        managedBy: {$ref: "Reference.yml"},
        accessibility: {type: "string"},
        categories: {type: "array", items: {$ref: "DefinedTerm.yml"}}
      }
    }
  ]
};

export function validateLocation(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForCore, "Core.yml");
  ajv.addSchema(schemaForOrigin, "Origin.yml");
  ajv.addSchema(schemaForTitle, "Title.yml");
  ajv.addSchema(schemaForText, "Text.yml");
  ajv.addSchema(schemaForPostalAddress, "PostalAddress.yml");
  ajv.addSchema(schemaForGeoCoordinates, "GeoCoordinates.yml");
  ajv.addSchema(schemaForBorough, "Borough.yml");
  ajv.addSchema(schemaForContactPoint, "ContactPoint.yml");
  ajv.addSchema(schemaForReference, "Reference.yml");
  ajv.addSchema(schemaForDefinedTerm, "DefinedTerm.yml");
  ajv.addSchema(schemaForShortText, "ShortText.yml");

  const validate = ajv.compile(schemaForLocation);
  return {isValid: validate(o), validate: validate};
}

export type Location = Core & {
  "@type"?: "VirtualLocation" | "Place";
  name?: Title;
  description?: Text;
  address?: PostalAddress;
  geo?: GeoCoordinates;
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
  contactPoint?: ContactPoint[];
  website?: string;
  managedBy?: Reference;
  accessibility?: string;
  categories?: DefinedTerm[];
};
