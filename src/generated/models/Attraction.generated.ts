/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Attraction.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {Metadata, schemaForMetadata} from "./Metadata.generated";
import {TranslatableField, schemaForTranslatableField} from "./TranslatableField.generated";
import {ExternalLinks, schemaForExternalLinks} from "./ExternalLinks.generated";

export const schemaForAttraction = {
  $id: "Attraction.yml",
  type: "object",
  required: ["type", "identifier", "metadata", "title"],
  properties: {
    type: {type: "string", enum: ["type.Attraction"]},
    identifier: {type: "string"},
    metadata: {$ref: "Metadata.yml"},
    status: {type: "string", enum: ["attraction.published", "attraction.unpublished", "attraction.archived"]},
    title: {$ref: "TranslatableField.yml", example: {de: "Konzert", en: "concert"}},
    displayName: {$ref: "TranslatableField.yml"},
    description: {$ref: "TranslatableField.yml", example: {de: "Eine Beschreibung", en: "Some description"}},
    pleaseNote: {$ref: "TranslatableField.yml", example: {de: "Achtung, laute Geräusche", en: "Warning, loud noises"}},
    website: {type: "string"},
    inLanguages: {type: "array", items: {type: "string"}},
    tags: {type: "array", items: {type: "string"}},
    externalLinks: {$ref: "ExternalLinks.yml"}
  }
};

export function validateAttraction(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForMetadata, "Metadata.yml");
  ajv.addSchema(schemaForTranslatableField, "TranslatableField.yml");
  ajv.addSchema(schemaForExternalLinks, "ExternalLinks.yml");

  const validate = ajv.compile(schemaForAttraction);
  return {isValid: validate(o), validate: validate};
}

export interface Attraction {
  type: "type.Attraction";
  identifier: string;
  metadata: Metadata;
  status?: "attraction.published" | "attraction.unpublished" | "attraction.archived";
  title: TranslatableField;
  displayName?: TranslatableField1;
  description?: TranslatableField2;
  pleaseNote?: TranslatableField3;
  website?: string;
  inLanguages?: string[];
  tags?: string[];
  externalLinks?: ExternalLinks;
}
