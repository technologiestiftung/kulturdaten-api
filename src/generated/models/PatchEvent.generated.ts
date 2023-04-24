/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/PatchEvent.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Title, schemaForTitle} from "./Title.generated";
import {Text, schemaForText} from "./Text.generated";
import {ShortText, schemaForShortText} from "./ShortText.generated";
import {DefinedTerm, schemaForDefinedTerm} from "./DefinedTerm.generated";
import {Reference, schemaForReference} from "./Reference.generated";

export const schemaForPatchEvent = {
  $id: "PatchEvent.yml",
  type: "object",
  additionalProperties: false,
  properties: {
    "@type": {type: "string", enum: ["Event", "EventSeries", "ExhibitionEvent"]},
    kind: {type: "string", enum: ["culture"]},
    title: {$ref: "Title.yml"},
    subTitle: {$ref: "Title.yml"},
    description: {$ref: "Text.yml"},
    shortDescription: {$ref: "ShortText.yml"},
    startDate: {type: "string", format: "date-time"},
    endDate: {type: "string", format: "date-time"},
    previousStartDate: {type: "string", format: "date-time"},
    doorTime: {type: "string", format: "date-time"},
    typicalAgeRange: {type: "string"},
    categories: {type: "array", items: {$ref: "DefinedTerm.yml"}},
    keywords: {type: "array", items: {$ref: "DefinedTerm.yml"}},
    inLanguages: {type: "array", items: {type: "string"}},
    isAccessibleForFree: {type: "boolean"},
    sameAs: {type: "string", format: "uri"},
    visibility: {type: "string", enum: ["published", "unpublished", "draft", "archived", "restricted"]},
    eventStatus: {type: "string", enum: ["cancelled", "postponed", "rescheduled", "scheduled"]},
    eventAttendanceMode: {type: "string", enum: ["offline", "online", "mixed"]},
    location: {type: "array", items: {$ref: "Reference.yml"}},
    organizer: {$ref: "Reference.yml"},
    subEvents: {type: "array", items: {$ref: "Reference.yml"}},
    superEvent: {$ref: "Reference.yml"}
  }
};

export function validatePatchEvent(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForTitle, "Title.yml");
  ajv.addSchema(schemaForText, "Text.yml");
  ajv.addSchema(schemaForShortText, "ShortText.yml");
  ajv.addSchema(schemaForDefinedTerm, "DefinedTerm.yml");
  ajv.addSchema(schemaForReference, "Reference.yml");

  const validate = ajv.compile(schemaForPatchEvent);
  return {isValid: validate(o), validate: validate};
}

export interface PatchEvent {
  "@type"?: "Event" | "EventSeries" | "ExhibitionEvent";
  kind?: "culture";
  title?: Title;
  subTitle?: Title;
  description?: Text;
  shortDescription?: ShortText;
  startDate?: string;
  endDate?: string;
  previousStartDate?: string;
  doorTime?: string;
  typicalAgeRange?: string;
  categories?: DefinedTerm[];
  keywords?: DefinedTerm[];
  inLanguages?: string[];
  isAccessibleForFree?: boolean;
  sameAs?: string;
  visibility?: "published" | "unpublished" | "draft" | "archived" | "restricted";
  eventStatus?: "cancelled" | "postponed" | "rescheduled" | "scheduled";
  eventAttendanceMode?: "offline" | "online" | "mixed";
  location?: Reference[];
  organizer?: Reference;
  subEvents?: Reference[];
  superEvent?: Reference;
}
