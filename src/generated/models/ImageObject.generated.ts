/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/ImageObject.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Core, schemaForCore} from "./Core.generated";
import {Title, schemaForTitle} from "./Title.generated";
import {Text, schemaForText} from "./Text.generated";

export const schemaForImageObject = {
  $id: "ImageObject.yml",
  allOf: [
    {$ref: "Core.yml"},
    {
      type: "object",
      properties: {
        "@type": {type: "string", enum: ["ImageObject"]},
        contentUrl: {type: "string", format: "uri"},
        height: {type: "number"},
        width: {type: "number"},
        caption: {$ref: "Title.yml"},
        description: {$ref: "Text.yml"},
        encodingFormat: {type: "string"},
        sha256: {type: "string"},
        license: {
          type: "object",
          properties: {
            name: {type: "string"},
            identifier: {type: "string", description: "SPDX License Identifier"},
            url: {type: "string", format: "uri"},
            acquireLicensePage: {type: "string", format: "uri"}
          }
        }
      }
    }
  ]
};

export function validateImageObject(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForCore, "Core.yml");
  ajv.addSchema(schemaForTitle, "Title.yml");
  ajv.addSchema(schemaForText, "Text.yml");

  const validate = ajv.compile(schemaForImageObject);
  return {isValid: validate(o), validate: validate};
}

export type ImageObject = Core & {
  "@type"?: "ImageObject";
  contentUrl?: string;
  height?: number;
  width?: number;
  caption?: Title;
  description?: Text;
  encodingFormat?: string;
  sha256?: string;
  license?: {
    name?: string;
    /**
     * SPDX License Identifier
     */
    identifier?: string;
    url?: string;
    acquireLicensePage?: string;
  };
};
