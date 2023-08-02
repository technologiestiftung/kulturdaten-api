/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/OpeningHours.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForOpeningHours = {
  $id: "OpeningHours.yml",
  type: "array",
  items: {
    type: "object",
    properties: {
      closes: {
        type: "string",
        description: "The closing hour of the place or service on the given day(s) of the week."
      },
      dayOfWeek: {
        type: "string",
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        description: "The day of the week for which these opening hours are valid."
      },
      opens: {type: "string", description: "The opening hour of the place or service on the given day(s) of the week."},
      validFrom: {type: "string", description: "The date when the item becomes valid."},
      validThrough: {
        type: "string",
        description:
          "The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours."
      }
    }
  }
};

export function validateOpeningHours(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForOpeningHours);
  return {isValid: validate(o), validate: validate};
}

export type OpeningHours = {
  /**
   * The closing hour of the place or service on the given day(s) of the week.
   */
  closes?: string;
  /**
   * The day of the week for which these opening hours are valid.
   */
  dayOfWeek?: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  /**
   * The opening hour of the place or service on the given day(s) of the week.
   */
  opens?: string;
  /**
   * The date when the item becomes valid.
   */
  validFrom?: string;
  /**
   * The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours.
   */
  validThrough?: string;
}[];
