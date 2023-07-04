/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Borough.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForBorough = {
  $id: "Borough.yml",
  type: "string",
  enum: [
    "Mitte",
    "Friedrichshain-Kreuzberg",
    "Pankow",
    "Charlottenburg-Wilmersdorf",
    "Spandau",
    "Steglitz-Zehlendorf",
    "Tempelhof-Schöneberg",
    "Neukölln",
    "Treptow-Köpenick",
    "Marzahn-Hellersdorf",
    "Lichtenberg",
    "Reinickendorf",
    "außerhalb"
  ]
};

export function validateBorough(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForBorough);
  return {isValid: validate(o), validate: validate};
}

export type Borough =
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
