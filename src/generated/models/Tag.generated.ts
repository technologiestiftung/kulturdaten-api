/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Tag.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {TranslatableField, schemaForTranslatableField} from "./TranslatableField.generated";
import {Metadata, schemaForMetadata} from "./Metadata.generated";

export const schemaForTag = {
  $id: "Tag.yml",
  type: "object",
  properties: {
    type: {type: "string", enum: ["type.Tag"]},
    identifier: {type: "string"},
    title: {$ref: "TranslatableField.yml"},
    metadata: {
      allOf: [
        {$ref: "Metadata.yml"},
        {type: "object", properties: {externalIDs: {type: "object", additionalProperties: {type: "string"}}}}
      ]
    }
  },
  required: ["identifier", "title"]
};

export function validateTag(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForTranslatableField, "TranslatableField.yml");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");

  const validate = ajv.compile(schemaForTag);
  return {isValid: validate(o), validate: validate};
}

export interface Tag {
  type?: "type.Tag";
  identifier: string;
  title: TranslatableField;
  metadata?: Metadata & {
    externalIDs?: {
      [k: string]: string;
    };
  };
}
