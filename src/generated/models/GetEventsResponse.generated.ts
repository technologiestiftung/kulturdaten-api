/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/GetEventsResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Event, schemaForEvent} from "./Event.generated";
import {Metadata, schemaForMetadata} from "./Metadata.generated";
import {Schedule, schemaForSchedule} from "./Schedule.generated";
import {Reference, schemaForReference} from "./Reference.generated";
import {Contact, schemaForContact} from "./Contact.generated";
import {Admission, schemaForAdmission} from "./Admission.generated";

export const schemaForGetEventsResponse = {
  $id: "GetEventsResponse.yml",
  type: "object",
  properties: {
    success: {type: "boolean"},
    message: {type: "string"},
    data: {
      type: "object",
      properties: {
        events: {type: "array", items: {$ref: "Event.yml"}},
        eventsReferences: {type: "array", items: {$ref: "Reference.yml"}}
      }
    }
  },
  required: ["success"]
};

export function validateGetEventsResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForEvent, "Event.yml");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");
  ajv.addSchema(schemaForSchedule, "Schedule.yml");
  ajv.addSchema(schemaForReference, "Reference.yml");
  ajv.addSchema(schemaForContact, "Contact.yml");
  ajv.addSchema(schemaForAdmission, "Admission.yml");

  const validate = ajv.compile(schemaForGetEventsResponse);
  return {isValid: validate(o), validate: validate};
}

export interface GetEventsResponse {
  success: boolean;
  message?: string;
  data?: {
    events?: Event[];
    eventsReferences?: Reference[];
  };
}
