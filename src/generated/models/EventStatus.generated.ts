/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/EventStatus.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForEventStatus = {
  $id: "EventStatus.yml",
  type: "object",
  properties: {
    visibility: {
      type: "string",
      enum: [
        "visibility.published",
        "visibility.unpublished",
        "visibility.draft",
        "visibility.archived",
        "visibility.restricted"
      ]
    },
    eventStatus: {
      type: "string",
      enum: ["eventStatus.cancelled", "eventStatus.postponed", "eventStatus.rescheduled", "eventStatus.scheduled"]
    }
  }
};

export function validateEventStatus(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForEventStatus);
  return {isValid: validate(o), validate: validate};
}

export interface EventStatus {
  visibility?:
    | "visibility.published"
    | "visibility.unpublished"
    | "visibility.draft"
    | "visibility.archived"
    | "visibility.restricted";
  eventStatus?: "eventStatus.cancelled" | "eventStatus.postponed" | "eventStatus.rescheduled" | "eventStatus.scheduled";
}
