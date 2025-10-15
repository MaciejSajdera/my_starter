import get from "lodash/get";
import { z } from "zod";
import { isReallyNaN } from "@/utils/number";
import { ValidationMessage } from "@/utils/schemas";

// ERROR MAP

/**
 * Custom validation messages.
 * @returns Custom message, or default message.
 */
const zodErrorMap: z.ZodErrorMap = (issue, ctx) => {
  // implicit required (if blank/empty and there is issue, then it's required)
  if (
    isEmptyValue(ctx.data) ||
    isEmptyUnionDiscriminator(issue, ctx.data) // empty discriminated union (e.g., campaign order li rate_type)
  )
    return {
      message: ValidationMessage.REQUIRED,
    };

  // invalid string or union (e.g., email | rate_type)
  if (
    issue.code === z.ZodIssueCode.invalid_string ||
    issue.code === z.ZodIssueCode.invalid_union ||
    issue.code === z.ZodIssueCode.invalid_union_discriminator // fallback if not "empty" as checked above
  ) {
    return { message: ValidationMessage.INVALID };
  }

  // Handle size validation for strings and numbers
  if (issue.code === z.ZodIssueCode.too_small) {
    if (issue.type === "string")
      return {
        message: `Minimum ${issue.minimum} characters.`,
      };

    if (issue.type === "number")
      return {
        message: `Minimum ${issue.minimum}.`,
      };
  }

  if (issue.code === z.ZodIssueCode.too_big) {
    if (issue.type === "string")
      return {
        message: `Maximum ${issue.maximum} characters.`,
      };

    if (issue.type === "number")
      return {
        message: `Maximum ${issue.maximum}.`,
      };
  }

  // DEFAULT (fallback)
  return { message: ctx.defaultError };
};

z.setErrorMap(zodErrorMap);

const isEmptyValue = (value: unknown) =>
  (value ?? "") === "" || // null-ish or empty string
  isReallyNaN(value) || // really NaN
  (Array.isArray(value) && !value.length); // empty array

const isEmptyUnionDiscriminator = (
  issue: z.ZodIssueOptionalMessage,
  ctxData: unknown
) => {
  // check issue code
  if (issue.code !== z.ZodIssueCode.invalid_union_discriminator) return false;

  // check for non-nullish object data
  if (!ctxData || typeof ctxData !== "object") return false;

  // drill into `ctx.data` by each `issue.path` item to retrieve value
  // issue.path: ["level1", "level2"]
  // ctx.data: { level1: { level2: null } }
  // value: null
  const value = get(ctxData, issue.path.join(".")) as unknown;

  return isEmptyValue(value);
};
