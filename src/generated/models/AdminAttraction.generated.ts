/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/AdminAttraction.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Metadata, schemaForMetadata} from "./Metadata.generated";
import {Event, schemaForEvent} from "./Event.generated";
import {Schedule, schemaForSchedule} from "./Schedule.generated";
import {Reference, schemaForReference} from "./Reference.generated";
import {Contact, schemaForContact} from "./Contact.generated";
import {Admission, schemaForAdmission} from "./Admission.generated";
import {ExternalLinks, schemaForExternalLinks} from "./ExternalLinks.generated";

export const schemaForAdminAttraction = {
  $id: "AdminAttraction.yml",
  type: "object",
  required: ["type", "identifier", "metadata", "title", "events"],
  properties: {
    type: {type: "string", enum: ["type.Attraction"]},
    identifier: {type: "string"},
    metadata: {$ref: "Metadata.yml"},
    status: {type: "string", enum: ["attraction.published", "attraction.unpublished", "attraction.archived"]},
    title: {type: "object", additionalProperties: {type: "string"}},
    displayName: {type: "object", additionalProperties: {type: "string"}},
    description: {type: "object", additionalProperties: {type: "string"}},
    pleaseNote: {type: "object", additionalProperties: {type: "string"}},
    website: {type: "string"},
    inLanguages: {type: "array", items: {type: "string"}},
    tags: {type: "array", items: {type: "string"}},
    events: {type: "array", items: {$ref: "Event.yml"}},
    externalLinks: {$ref: "ExternalLinks.yml"}
  }
};

export function validateAdminAttraction(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");
  ajv.addSchema(schemaForEvent, "Event.yml");
  ajv.addSchema(schemaForSchedule, "Schedule.yml");
  ajv.addSchema(schemaForReference, "Reference.yml");
  ajv.addSchema(schemaForContact, "Contact.yml");
  ajv.addSchema(schemaForAdmission, "Admission.yml");
  ajv.addSchema(schemaForExternalLinks, "ExternalLinks.yml");

  const validate = ajv.compile(schemaForAdminAttraction);
  return {isValid: validate(o), validate: validate};
}

export interface AdminAttraction {
  type: "type.Attraction";
  identifier: string;
  metadata: Metadata;
  status?: "attraction.published" | "attraction.unpublished" | "attraction.archived";
  title: {
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
  tags?: string[];
  events: Event[];
  externalLinks?: ExternalLinks;
}
