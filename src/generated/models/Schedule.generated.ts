/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Schedule.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForSchedule = {
  $id: "Schedule.yml",
  type: "object",
  properties: {
    startDate: {type: "string"},
    startTime: {type: "string"},
    permanentOpening: {type: "boolean"},
    doorTime: {type: "string"},
    endDate: {type: "string"},
    endTime: {type: "string"}
  }
};

export function validateSchedule(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForSchedule);
  return {isValid: validate(o), validate: validate};
}

export interface Schedule {
  startDate?: string;
  startTime?: string;
  permanentOpening?: boolean;
  doorTime?: string;
  endDate?: string;
  endTime?: string;
}
