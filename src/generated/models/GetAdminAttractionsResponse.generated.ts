/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/GetAdminAttractionsResponse.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {AdminAttraction, schemaForAdminAttraction} from "./AdminAttraction.generated";
import {Metadata, schemaForMetadata} from "./Metadata.generated";
import {TranslatableField, schemaForTranslatableField} from "./TranslatableField.generated";
import {Event, schemaForEvent} from "./Event.generated";
import {Schedule, schemaForSchedule} from "./Schedule.generated";
import {Reference, schemaForReference} from "./Reference.generated";
import {Contact, schemaForContact} from "./Contact.generated";
import {Admission, schemaForAdmission} from "./Admission.generated";
import {ExternalLinks, schemaForExternalLinks} from "./ExternalLinks.generated";

export const schemaForGetAdminAttractionsResponse = {
  $id: "GetAdminAttractionsResponse.yml",
  type: "object",
  properties: {
    success: {type: "boolean"},
    message: {type: "string"},
    data: {
      type: "object",
      required: ["page", "pageSize", "totalCount", "attractions"],
      properties: {
        page: {type: "number"},
        pageSize: {type: "number"},
        totalCount: {type: "number"},
        attractions: {type: "array", items: {$ref: "AdminAttraction.yml"}}
      }
    }
  },
  required: ["success", "data"]
};

export function validateGetAdminAttractionsResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForAdminAttraction, "AdminAttraction.yml");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");
  ajv.addSchema(schemaForTranslatableField, "TranslatableField.yml");
  ajv.addSchema(schemaForEvent, "Event.yml");
  ajv.addSchema(schemaForSchedule, "Schedule.yml");
  ajv.addSchema(schemaForReference, "Reference.yml");
  ajv.addSchema(schemaForContact, "Contact.yml");
  ajv.addSchema(schemaForAdmission, "Admission.yml");
  ajv.addSchema(schemaForExternalLinks, "ExternalLinks.yml");

  const validate = ajv.compile(schemaForGetAdminAttractionsResponse);
  return {isValid: validate(o), validate: validate};
}

export interface GetAdminAttractionsResponse {
  success: boolean;
  message?: string;
  data: {
    page: number;
    pageSize: number;
    totalCount: number;
    attractions: AdminAttraction[];
  };
}
