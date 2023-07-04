/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Contact.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForContact = {
  $id: "Contact.yml",
  type: "object",
  properties: {name: {type: "string"}, email: {type: "string"}, telephone: {type: "string"}}
};

export function validateContact(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForContact);
  return {isValid: validate(o), validate: validate};
}

export interface Contact {
  name?: string;
  email?: string;
  telephone?: string;
}
