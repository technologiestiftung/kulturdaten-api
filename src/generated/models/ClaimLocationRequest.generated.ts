/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/ClaimLocationRequest.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForClaimLocationRequest = {
  $id: "ClaimLocationRequest.yml",
  type: "object",
  properties: {
    organizationIdentifier: {type: "string", description: "The identifier of the organization claiming the location."},
    justification: {type: "string", description: "The reason why the organization is claiming the location."},
    contact: {
      type: "object",
      description: "Contact information for any inquiries related to the claim.",
      properties: {
        name: {type: "string", description: "Contact person's full name."},
        email: {type: "string", description: "Contact person's email address."},
        phone: {type: "string", description: "Contact person's phone number (optional)."}
      }
    }
  },
  required: ["organizationIdentifier", "justification", "contact"]
};

export function validateClaimLocationRequest(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForClaimLocationRequest);
  return {isValid: validate(o), validate: validate};
}

export interface ClaimLocationRequest {
  /**
   * The identifier of the organization claiming the location.
   */
  organizationIdentifier: string;
  /**
   * The reason why the organization is claiming the location.
   */
  justification: string;
  /**
   * Contact information for any inquiries related to the claim.
   */
  contact: {
    /**
     * Contact person's full name.
     */
    name?: string;
    /**
     * Contact person's email address.
     */
    email?: string;
    /**
     * Contact person's phone number (optional).
     */
    phone?: string;
  };
}
