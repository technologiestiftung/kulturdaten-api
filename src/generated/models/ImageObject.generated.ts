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

import {SubTitle, schemaForSubTitle} from "./SubTitle.generated";
import {Description, schemaForDescription} from "./Description.generated";

export const schemaForImageObject = {
  type: "object",
  properties: {
    "@context": {type: "string", enum: ["kulturdaten.berlin/api/v1/spec"]},
    identifier: {type: "string"},
    created: {type: "string", format: "date-time"},
    updated: {type: "string", format: "date-time"},
    "@type": {type: "string", enum: ["ImageObject"]},
    contentUrl: {type: "string", format: "uri"},
    height: {type: "number"},
    width: {type: "number"},
    caption: {$ref: "SubTitle.yml"},
    description: {$ref: "Description.yml"},
    encodingFormat: {type: "string"},
    sha256: {type: "string"},
    license: {type: "string", format: "uri"},
    acquireLicensePage: {type: "string", format: "uri"}
  }
};

export function validateImageObject(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  ajv.addSchema(schemaForSubTitle, "SubTitle.yml");
  ajv.addSchema(schemaForDescription, "Description.yml");

  const validate = ajv.compile(schemaForImageObject);
  return {isValid: validate(o), validate: validate};
}

export interface ImageObject {
  "@context"?: "kulturdaten.berlin/api/v1/spec";
  identifier?: string;
  created?: string;
  updated?: string;
  "@type"?: "ImageObject";
  contentUrl?: string;
  height?: number;
  width?: number;
  caption?: SubTitle;
  description?: Description;
  encodingFormat?: string;
  sha256?: string;
  license?: string;
  acquireLicensePage?: string;
}
