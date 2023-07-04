/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/HealthResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForHealthResponse = {
  $id: "HealthResponse.yml",
  type: "object",
  properties: {
    healthy: {type: "boolean"},
    dependencies: {
      type: "array",
      items: {type: "object", properties: {name: {type: "string"}, healthy: {type: "boolean"}}}
    }
  }
};

export function validateHealthResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForHealthResponse);
  return {isValid: validate(o), validate: validate};
}

export interface HealthResponse {
  healthy?: boolean;
  dependencies?: {
    name?: string;
    healthy?: boolean;
  }[];
}
