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

export const schemaForLocation = {$id: "Location.yml", type: "object", properties: {name: {type: "string"}}};

export function validateLocation(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);

  const validate = ajv.compile(schemaForLocation);
  return {isValid: validate(o), validate: validate};
}

export interface Location {
  name?: string;
}
