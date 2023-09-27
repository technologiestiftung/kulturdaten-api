/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/UpdateEventRequest.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {TranslatableField, schemaForTranslatableField} from "./TranslatableField.generated";
import {Contact, schemaForContact} from "./Contact.generated";
import {Admission, schemaForAdmission} from "./Admission.generated";

export const schemaForUpdateEventRequest = {
  $id: "UpdateEventRequest.yml",
  type: "object",
  properties: {
    title: {$ref: "TranslatableField.yml"},
    displayName: {$ref: "TranslatableField.yml"},
    description: {$ref: "TranslatableField.yml"},
    pleaseNote: {$ref: "TranslatableField.yml"},
    website: {type: "string"},
    inLanguages: {type: "array", items: {type: "string"}},
    tags: {type: "array", items: {type: "string"}},
    contact: {$ref: "Contact.yml"},
    admission: {$ref: "Admission.yml"}
  }
};

export function validateUpdateEventRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForTranslatableField, "TranslatableField.yml");
  ajv.addSchema(schemaForContact, "Contact.yml");
  ajv.addSchema(schemaForAdmission, "Admission.yml");

  const validate = ajv.compile(schemaForUpdateEventRequest);
  return {isValid: validate(o), validate: validate};
}

export interface UpdateEventRequest {
  title?: TranslatableField;
  displayName?: TranslatableField;
  description?: TranslatableField;
  pleaseNote?: TranslatableField;
  website?: string;
  inLanguages?: string[];
  tags?: string[];
  contact?: Contact;
  admission?: Admission;
}
