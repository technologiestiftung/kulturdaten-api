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

export const schemaForCreateOrganizationResponse = {
  $id: "CreateOrganizationResponse.yml",
  properties: {
    success: {type: "boolean", enum: [true]},
    message: {type: "string"},
    data: {type: "object", properties: {organizationIdentifier: {type: "string"}}}
  },
  required: ["success"]
};

export function validateCreateOrganizationResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForCreateOrganizationResponse);
  return {isValid: validate(o), validate: validate};
}

export interface CreateOrganizationResponse {
  success: true;
  message?: string;
  data?: {
    organizationIdentifier?: string;
  };
}
