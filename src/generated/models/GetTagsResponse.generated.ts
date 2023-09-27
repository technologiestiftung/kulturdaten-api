/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/GetTagsResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Tag, schemaForTag} from "./Tag.generated";
import {TranslatableField, schemaForTranslatableField} from "./TranslatableField.generated";
import {Metadata, schemaForMetadata} from "./Metadata.generated";

export const schemaForGetTagsResponse = {
  $id: "GetTagsResponse.yml",
  type: "object",
  properties: {
    success: {type: "boolean"},
    message: {type: "string"},
    data: {type: "object", properties: {tags: {type: "array", items: {$ref: "Tag.yml"}}}}
  },
  required: ["success"]
};

export function validateGetTagsResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForTag, "Tag.yml");
  ajv.addSchema(schemaForTranslatableField, "TranslatableField.yml");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");

  const validate = ajv.compile(schemaForGetTagsResponse);
  return {isValid: validate(o), validate: validate};
}

export interface GetTagsResponse {
  success: boolean;
  message?: string;
  data?: {
    tags?: Tag[];
  };
}
