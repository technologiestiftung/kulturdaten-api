/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
 *
 * =>  @see ./src/schemas/models/Pagination.yml
 *
 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
 */

import Ajv, {ValidateFunction} from "ajv";
import addFormats from "ajv-formats";

export const schemaForPagination = {
  $id: "Pagination.yml",
  type: "object",
  description: "Metadata for paginated lists.",
  properties: {
    page: {type: "number", description: "The current page, starting with 1", example: 1},
    pageSize: {type: "number", description: "The number of items per page", example: 30},
    totalCount: {type: "number", description: "The total number of items", example: 105}
  },
  required: ["page", "pageSize", "totalCount"]
};

export function validatePagination(o: object): {isValid: boolean; validate: ValidateFunction} {
  const ajv = new Ajv();
  addFormats(ajv);
  ajv.addKeyword("example");

  const validate = ajv.compile(schemaForPagination);
  return {isValid: validate(o), validate: validate};
}

/**
 * Metadata for paginated lists.
 */
export interface Pagination {
  /**
   * The current page, starting with 1
   */
  page: number;
  /**
   * The number of items per page
   */
  pageSize: number;
  /**
   * The total number of items
   */
  totalCount: number;
}
