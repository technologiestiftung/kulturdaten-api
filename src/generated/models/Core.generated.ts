/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Core.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForCore = {
  $id: "Core.yml",
  type: "object",
  properties: {
    "@context": {type: "string", enum: ["kulturdaten.berlin/api/v1/spec"]},
    identifier: {type: "string"},
    created: {type: "string", format: "date-time"},
    updated: {type: "string", format: "date-time"},
    kind: {type: "string", enum: ["culture"]},
    origin: {type: "string"}
  }
};

export function validateCore(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForCore);
  return {isValid: validate(o), validate: validate};
}

export interface Core {
  "@context"?: "kulturdaten.berlin/api/v1/spec";
  identifier?: string;
  created?: string;
  updated?: string;
  kind?: "culture";
  origin?: string;
}
