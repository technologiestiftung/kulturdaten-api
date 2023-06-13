/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/CreateEventCommand.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {EventSchedule, schemaForEventSchedule} from "./EventSchedule.generated";
import {EventAdmission, schemaForEventAdmission} from "./EventAdmission.generated";
import {EventProfile, schemaForEventProfile} from "./EventProfile.generated";
import {EventClassification, schemaForEventClassification} from "./EventClassification.generated";
import {EventStatus, schemaForEventStatus} from "./EventStatus.generated";

export const schemaForCreateEventCommand = {
  $id: "CreateEventCommand.yml",
  type: "object",
  properties: {
    type: {type: "string", enum: ["type.command.Event.create"]},
    payload: {
      type: "object",
      properties: {
        attractionsReferenceIds: {type: "array", items: {type: "string"}},
        schedule: {$ref: "EventSchedule.yml"},
        locationsReferenceIds: {type: "array", items: {type: "string"}},
        organizerId: {type: "string"},
        admission: {$ref: "EventAdmission.yml"},
        profile: {$ref: "EventProfile.yml"},
        classification: {$ref: "EventClassification.yml"},
        status: {$ref: "EventStatus.yml"}
      }
    }
  }
};

export function validateCreateEventCommand(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForEventSchedule, "EventSchedule.yml");
  ajv.addSchema(schemaForEventAdmission, "EventAdmission.yml");
  ajv.addSchema(schemaForEventProfile, "EventProfile.yml");
  ajv.addSchema(schemaForEventClassification, "EventClassification.yml");
  ajv.addSchema(schemaForEventStatus, "EventStatus.yml");

  const validate = ajv.compile(schemaForCreateEventCommand);
  return {isValid: validate(o), validate: validate};
}

export interface CreateEventCommand {
  type?: "type.command.Event.create";
  payload?: {
    attractionsReferenceIds?: string[];
    schedule?: EventSchedule;
    locationsReferenceIds?: string[];
    organizerId?: string;
    admission?: EventAdmission;
    profile?: EventProfile;
    classification?: EventClassification;
    status?: EventStatus;
  };
}