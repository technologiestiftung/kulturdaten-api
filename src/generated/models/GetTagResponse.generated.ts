/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/GetTagResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Tag, schemaForTag} from "./Tag.generated";
import {Metadata, schemaForMetadata} from "./Metadata.generated";

export const schemaForGetTagResponse = {
  $id: "GetTagResponse.yml",
  type: "object",
  properties: {
    success: {type: "boolean"},
    message: {type: "string"},
    data: {type: "object", properties: {tag: {$ref: "Tag.yml"}}}
  },
  required: ["success"]
};

export function validateGetTagResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForTag, "Tag.yml");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");

  const validate = ajv.compile(schemaForGetTagResponse);
  return {isValid: validate(o), validate: validate};
}

export interface GetTagResponse {
  success: boolean;
  message?: string;
  data?: {
    tag?: Tag;
  };
}
