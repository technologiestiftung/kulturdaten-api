/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/CreateAttractionResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForCreateAttractionResponse = {
  $id: "CreateAttractionResponse.yml",
  type: "object",
  properties: {
    success: {type: "boolean", enum: [true]},
    message: {type: "string"},
    data: {type: "object", properties: {attractionIdentifier: {type: "string"}}}
  },
  required: ["success"]
};

export function validateCreateAttractionResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForCreateAttractionResponse);
  return {isValid: validate(o), validate: validate};
}

export interface CreateAttractionResponse {
  success: true;
  message?: string;
  data?: {
    attractionIdentifier?: string;
  };
}
