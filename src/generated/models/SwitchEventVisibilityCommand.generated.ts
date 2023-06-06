/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/SwitchEventVisibilityCommand.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForSwitchEventVisibilityCommand = {
  $id: "SwitchEventVisibilityCommand.yml",
  type: "object",
  properties: {
    type: {type: "string", enum: ["type.command.Event.switchVisibility"]},
    payload: {
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
        }
      }
    }
  }
};

export function validateSwitchEventVisibilityCommand(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForSwitchEventVisibilityCommand);
  return {isValid: validate(o), validate: validate};
}

export interface SwitchEventVisibilityCommand {
  type?: "type.command.Event.switchVisibility";
  payload?: {
    visibility?:
      | "visibility.published"
      | "visibility.unpublished"
      | "visibility.draft"
      | "visibility.archived"
      | "visibility.restricted";
  };
}
