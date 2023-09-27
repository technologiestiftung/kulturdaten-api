/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/SearchEventsResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {GetEventsResponse, schemaForGetEventsResponse} from "./GetEventsResponse.generated";
import {Event, schemaForEvent} from "./Event.generated";
import {Metadata, schemaForMetadata} from "./Metadata.generated";
import {Schedule, schemaForSchedule} from "./Schedule.generated";
import {TranslatableField, schemaForTranslatableField} from "./TranslatableField.generated";
import {Reference, schemaForReference} from "./Reference.generated";
import {Contact, schemaForContact} from "./Contact.generated";
import {Admission, schemaForAdmission} from "./Admission.generated";

export const schemaForSearchEventsResponse = {$id: "SearchEventsResponse.yml", $ref: "GetEventsResponse.yml"};

export function validateSearchEventsResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForGetEventsResponse, "GetEventsResponse.yml");
  ajv.addSchema(schemaForEvent, "Event.yml");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");
  ajv.addSchema(schemaForSchedule, "Schedule.yml");
  ajv.addSchema(schemaForTranslatableField, "TranslatableField.yml");
  ajv.addSchema(schemaForReference, "Reference.yml");
  ajv.addSchema(schemaForContact, "Contact.yml");
  ajv.addSchema(schemaForAdmission, "Admission.yml");

  const validate = ajv.compile(schemaForSearchEventsResponse);
  return {isValid: validate(o), validate: validate};
}

export interface SearchEventsResponse {
  success: boolean;
  message?: string;
  data?: {
    page?: number;
    pageSize?: number;
    totalCount?: number;
    events?: Event[];
    eventsReferences?: Reference[];
  };
}
