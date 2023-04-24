/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/ContactPoint.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Title, schemaForTitle} from "./Title.generated";

export const schemaForContactPoint = {
  $id: "ContactPoint.yml",
  type: "object",
  properties: {
    "@type": {type: "string", enum: ["ContactPoint"]},
    name: {$ref: "Title.yml"},
    telephone: {type: "string"},
    email: {type: "string"}
  }
};

export function validateContactPoint(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForTitle, "Title.yml");

  const validate = ajv.compile(schemaForContactPoint);
  return {isValid: validate(o), validate: validate};
}

export interface ContactPoint {
  "@type"?: "ContactPoint";
  name?: Title;
  telephone?: string;
  email?: string;
}
