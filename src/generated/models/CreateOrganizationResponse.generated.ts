/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/CreateOrganizationResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Reference, schemaForReference} from "./Reference.generated";
import {TranslatableField, schemaForTranslatableField} from "./TranslatableField.generated";

export const schemaForCreateOrganizationResponse = {
  $id: "CreateOrganizationResponse.yml",
  properties: {
    success: {type: "boolean", enum: [true]},
    message: {type: "string"},
    data: {type: "object", properties: {organizationReference: {$ref: "Reference.yml"}}}
  },
  required: ["success"]
};

export function validateCreateOrganizationResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForReference, "Reference.yml");
  ajv.addSchema(schemaForTranslatableField, "TranslatableField.yml");

  const validate = ajv.compile(schemaForCreateOrganizationResponse);
  return {isValid: validate(o), validate: validate};
}

export interface CreateOrganizationResponse {
  success: true;
  message?: string;
  data?: {
    organizationReference?: Reference;
  };
}
