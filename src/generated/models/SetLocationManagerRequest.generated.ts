/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/SetLocationManagerRequest.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {TranslatableField, schemaForTranslatableField} from "./TranslatableField.generated";

export const schemaForSetLocationManagerRequest = {
  $id: "SetLocationManagerRequest.yml",
  type: "object",
  properties: {organizationIdentifier: {type: "string"}, alternativeDisplayName: {$ref: "TranslatableField.yml"}},
  required: ["organizationIdentifier"]
};

export function validateSetLocationManagerRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForTranslatableField, "TranslatableField.yml");

  const validate = ajv.compile(schemaForSetLocationManagerRequest);
  return {isValid: validate(o), validate: validate};
}

export interface SetLocationManagerRequest {
  organizationIdentifier: string;
  alternativeDisplayName?: TranslatableField;
}
