/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Address.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForAddress = {
  $id: "Address.yml",
  type: "object",
  properties: {
    streetAddress: {type: "string"},
    addressLocality: {type: "string"},
    postalCode: {type: "string"},
    description: {type: "string"}
  }
};

export function validateAddress(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForAddress);
  return {isValid: validate(o), validate: validate};
}

export interface Address {
  streetAddress?: string;
  addressLocality?: string;
  postalCode?: string;
  description?: string;
}
