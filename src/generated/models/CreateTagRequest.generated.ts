/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/CreateTagRequest.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Tag, schemaForTag} from "./Tag.generated";
import {Metadata, schemaForMetadata} from "./Metadata.generated";

export const schemaForCreateTagRequest = {$id: "CreateTagRequest.yml", $ref: "Tag.yml"};

export function validateCreateTagRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForTag, "Tag.yml");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");

  const validate = ajv.compile(schemaForCreateTagRequest);
  return {isValid: validate(o), validate: validate};
}

export interface CreateTagRequest {
  type?: "type.Tag";
  identifier: string;
  title: {
    [k: string]: string;
  };
  metadata?: Metadata & {
    externalIDs?: {
      [k: string]: string;
    };
  };
}
