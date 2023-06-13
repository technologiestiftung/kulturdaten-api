/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/CommandLocationEditProfile.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

import {LocationProfile, schemaForLocationProfile} from "./LocationProfile.generated";

export const schemaForCommandLocationEditProfile = {
  $id: "CommandLocationEditProfile.yml",
  type: "object",
  properties: {
    type: {type: "string", enum: ["type.command.Location.editProfile"]},
    payload: {$ref: "LocationProfile.yml"}
  }
};

export function validateCommandLocationEditProfile(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");
  ajv.addSchema(schemaForLocationProfile, "LocationProfile.yml");

  const validate = ajv.compile(schemaForCommandLocationEditProfile);
  return {isValid: validate(o), validate: validate};
}

export interface CommandLocationEditProfile {
  type?: "type.command.Location.editProfile";
  payload?: LocationProfile;
}