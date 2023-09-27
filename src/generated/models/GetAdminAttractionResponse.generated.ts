/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/GetAdminAttractionResponse.yml
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

export const schemaForGetAdminAttractionResponse = {
  $id: "GetAdminAttractionResponse.yml",
  type: "object",
  properties: {
    success: {type: "boolean"},
    message: {type: "string"},
    data: {type: "object", properties: {attraction: {$ref: "AdminAttraction.yml"}}}
  },
  required: ["success"]
};

export function validateGetAdminAttractionResponse(o: object): {isValid: boolean; validate: ValidateFunction} {
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

  const validate = ajv.compile(schemaForGetAdminAttractionResponse);
  return {isValid: validate(o), validate: validate};
}

export interface GetAdminAttractionResponse {
  success: boolean;
  message?: string;
  data?: {
    attraction?: AdminAttraction;
  };
}
