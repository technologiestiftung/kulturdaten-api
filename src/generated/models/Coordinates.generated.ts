/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Coordinates.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForCoordinates = {
  $id: "Coordinates.yml",
  type: "object",
  properties: {
    latitude: {type: "string"},
    longitude: {type: "string"},
    coordinateSystem: {type: "string", enum: ["WGS84 (Decimal Degrees)"]}
  }
};

export function validateCoordinates(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForCoordinates);
  return {isValid: validate(o), validate: validate};
}

export interface Coordinates {
  latitude?: string;
  longitude?: string;
  coordinateSystem?: "WGS84 (Decimal Degrees)";
}
