/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Event.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Metadata, schemaForMetadata} from "./Metadata.generated";
import {Schedule, schemaForSchedule} from "./Schedule.generated";
import {Reference, schemaForReference} from "./Reference.generated";
import {Contact, schemaForContact} from "./Contact.generated";
import {Admission, schemaForAdmission} from "./Admission.generated";

export const schemaForEvent = {
  $id: "Event.yml",
  type: "object",
  required: ["identifier"],
  properties: {
    type: {type: "string", enum: ["type.Event"]},
    identifier: {type: "string"},
    metadata: {$ref: "Metadata.yml"},
    status: {type: "string", enum: ["event.published", "event.unpublished", "event.archived"]},
    scheduleStatus: {
      type: "string",
      enum: ["event.cancelled", "event.postponed", "event.rescheduled", "event.scheduled"]
    },
    schedule: {$ref: "Schedule.yml"},
    title: {type: "object", additionalProperties: {type: "string"}},
    displayName: {type: "object", additionalProperties: {type: "string"}},
    description: {type: "object", additionalProperties: {type: "string"}},
    pleaseNote: {type: "object", additionalProperties: {type: "string"}},
    website: {type: "string"},
    inLanguages: {type: "array", items: {type: "string"}},
    family: {type: "boolean"},
    tags: {type: "array", items: {type: "string"}},
    locations: {type: "array", items: {$ref: "Reference.yml"}},
    attractions: {type: "array", items: {$ref: "Reference.yml"}},
    organizer: {$ref: "Reference.yml"},
    contact: {$ref: "Contact.yml"},
    admission: {$ref: "Admission.yml"}
  }
};

export function validateEvent(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");
  ajv.addSchema(schemaForSchedule, "Schedule.yml");
  ajv.addSchema(schemaForReference, "Reference.yml");
  ajv.addSchema(schemaForContact, "Contact.yml");
  ajv.addSchema(schemaForAdmission, "Admission.yml");

  const validate = ajv.compile(schemaForEvent);
  return {isValid: validate(o), validate: validate};
}

export interface Event {
  type?: "type.Event";
  identifier: string;
  metadata?: Metadata;
  status?: "event.published" | "event.unpublished" | "event.archived";
  scheduleStatus?: "event.cancelled" | "event.postponed" | "event.rescheduled" | "event.scheduled";
  schedule?: Schedule;
  title?: {
    [k: string]: string;
  };
  displayName?: {
    [k: string]: string;
  };
  description?: {
    [k: string]: string;
  };
  pleaseNote?: {
    [k: string]: string;
  };
  website?: string;
  inLanguages?: string[];
  family?: boolean;
  tags?: string[];
  locations?: Reference[];
  attractions?: Reference[];
  organizer?: Reference;
  contact?: Contact;
  admission?: Admission;
}
