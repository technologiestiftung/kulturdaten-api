/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/CreateEventRequest.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Schedule, schemaForSchedule} from "./Schedule.generated";
import {TranslatableField, schemaForTranslatableField} from "./TranslatableField.generated";
import {Reference, schemaForReference} from "./Reference.generated";
import {Contact, schemaForContact} from "./Contact.generated";
import {Admission, schemaForAdmission} from "./Admission.generated";

export const schemaForCreateEventRequest = {
  $id: "CreateEventRequest.yml",
  type: "object",
  properties: {
    type: {type: "string", enum: ["type.Event"]},
    schedule: {$ref: "Schedule.yml"},
    title: {$ref: "TranslatableField.yml"},
    displayName: {$ref: "TranslatableField.yml"},
    description: {$ref: "TranslatableField.yml"},
    pleaseNote: {$ref: "TranslatableField.yml"},
    website: {type: "string"},
    inLanguages: {type: "array", items: {type: "string"}},
    tags: {type: "array", items: {type: "string"}},
    locations: {type: "array", items: {$ref: "Reference.yml"}},
    attractions: {type: "array", items: {$ref: "Reference.yml"}},
    organizer: {$ref: "Reference.yml"},
    contact: {$ref: "Contact.yml"},
    admission: {$ref: "Admission.yml"},
    metadata: {type: "object", properties: {origin: {type: "string"}, originObjectID: {type: "string"}}}
  },
  required: ["type"]
};

export function validateCreateEventRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForSchedule, "Schedule.yml");
  ajv.addSchema(schemaForTranslatableField, "TranslatableField.yml");
  ajv.addSchema(schemaForReference, "Reference.yml");
  ajv.addSchema(schemaForContact, "Contact.yml");
  ajv.addSchema(schemaForAdmission, "Admission.yml");

  const validate = ajv.compile(schemaForCreateEventRequest);
  return {isValid: validate(o), validate: validate};
}

export interface CreateEventRequest {
  type: "type.Event";
  schedule?: Schedule;
  title?: TranslatableField;
  displayName?: TranslatableField;
  description?: TranslatableField;
  pleaseNote?: TranslatableField;
  website?: string;
  inLanguages?: string[];
  tags?: string[];
  locations?: Reference[];
  attractions?: Reference[];
  organizer?: Reference;
  contact?: Contact;
  admission?: Admission;
  metadata?: {
    origin?: string;
    originObjectID?: string;
  };
}
