/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Admission.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForAdmission = {
  $id: "Admission.yml",
  type: "object",
  properties: {
    note: {type: "object", additionalProperties: {type: "string"}},
    ticketType: {type: "string", enum: ["ticketType.ticketRequired", "ticketType.freeOfCharge"]},
    registrationType: {
      type: "string",
      enum: [
        "registrationType.registrationRequired",
        "registrationType.noRegistrationRequired",
        "registrationType.registrationDesired"
      ]
    },
    admissionLink: {type: "string"}
  }
};

export function validateAdmission(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForAdmission);
  return {isValid: validate(o), validate: validate};
}

export interface Admission {
  note?: {
    [k: string]: string;
  };
  ticketType?: "ticketType.ticketRequired" | "ticketType.freeOfCharge";
  registrationType?:
    | "registrationType.registrationRequired"
    | "registrationType.noRegistrationRequired"
    | "registrationType.registrationDesired";
  admissionLink?: string;
}
